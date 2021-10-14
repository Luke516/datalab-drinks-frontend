const express = require('express');
var cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

const describeOrder = (order) => {
  let ice_tags = ["unknown", "熱", "去冰", "少冰", "正常冰"];
  let sugar_tags = ["unknown", "無糖", "微糖", "半糖", "正常糖"];
  let items = ["unknown", "cama 經典黑咖啡", "cama 經典拿鐵", "卡布奇諾", "焦糖瑪琪朵", "香草拿鐵", "榛果拿鐵", "海鹽焦糖拿鐵", "黑糖拿鐵", "蜂蜜拿鐵", "摩卡咖啡", "純高山錫蘭茶", "純清焙烏龍茶", "鮮奶高山錫蘭", "鮮奶清焙烏龍", "特調高山錫蘭", "特調清焙烏龍", "蘋果檸香錫蘭紅茶", "蜜桃荔枝錫蘭紅茶", "德國花草茶", "浮雲奶蓋錫蘭紅", "浮雲奶蓋烏龍茶"];

  let ice_tag = ice_tags[order.ice_id];
  let sugar_tag = sugar_tags[order.sugar_id];
  let item = items[order.item_id];
  
  return {
    ...order,
    item,
    ice_tag,
    sugar_tag
  }
}

const main = async () => {

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'build')));

  // Put all API endpoints under '/api'
  app.get('/api/hello', (req, res) => {

    // Return them as json
    res.json({
      hello: "world"
    });

    console.log(`Sent ${count} passwords`);
  });

  app.post('/api/orders', async (req, res) => {
    console.log(req.body);

    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    const querySql = `INSERT INTO Drink (orderer, record) VALUES (?, ?) ON DUPLICATE KEY UPDATE orderer=?, record=? ;`
    try{
      await conn.execute(querySql, [req.body.order_by || "unknown",  JSON.stringify(req.body), req.body.order_by || "unknown",  JSON.stringify(req.body)]);
    }
    catch(err){
      console.log("err");
      console.log(err);
    }

    res.json(req.body);
  });

  app.get('/api/orders', async (req, res) => {
    console.log(req.body);
    let payload = [];

    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    const querySql = `SELECT * FROM Drink`;
    try{
      let [rows, fields] = await conn.execute(querySql, [JSON.stringify(req.body)]);
      rows.forEach(row => {
        payload.push(describeOrder(JSON.parse(row["record"])));
      });
    }
    catch(err){
      console.log("err");
      console.log(err);
    }

    console.log(payload);

    res.json({
      payload: {
        week_orders: payload
      }
    });
  });

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log(`listening on ${port}`);
}

main();