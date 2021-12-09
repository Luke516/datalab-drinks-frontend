const express = require('express');
var cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const { fetchParticipantRowsFromSheet, fetchParticipantGroupsFromSheet } = require('./sheet');
require('dotenv').config();

let nameSchedule = {};

const rawSchedule = [
    "陳冠廷 顏雅帆 巫虹儀 張晏瑄 林羿茹 蔡宗言 陳巧文 魏翊如 吳旭崧 曾昀婷 羅惟馨 李宜庭 梁韶庭 葉宇倫 游秉中"
    // "顏雅帆 陳冠廷 陳巧文 劉珆睿 吳旭崧 梁韶庭 羅惟馨 嚴幼珊 游秉中 蔡宗言 陳沛云 葉宇倫 魏翊如 李佳真 曾昀婷",
    // "游秉中 曾昀婷 侯柔含 林子鈞 黃伊娸 林羿茹 巫虹儀 李宜庭 顏雅帆 魏翊如 陳巧文 蔡宗言 吳旭崧 賴佩昕 陳冠廷",
    // "蔡宗言 賴佩昕 陳沛云 曾昀婷 侯柔含 陳冠廷 黃伊娸 陳倩文 巫虹儀 顏雅帆 李佳真 游秉中 林羿茹 劉珆睿 葉育慈",
    // "曾昀婷 游秉中 梁韶庭 蔡宗言 羅惟馨 蕭郁儒 陳沛云 張晏瑄 李佳真 陳冠廷 吳旭崧 葉育慈 侯柔含 黃伊娸 顏雅帆",
    // "劉珆睿 張晏瑄 李佳真 顏雅帆 葉宇倫 林子鈞 葉育慈 蕭郁儒 魏翊如 陳倩文 林羿茹 嚴幼珊 陳巧文 蔡宗言 吳旭崧",
    // "張晏瑄 劉珆睿 魏翊如 陳冠廷 梁韶庭 嚴幼珊 葉宇倫 曾昀婷 李宜庭 林子鈞 巫虹儀 陳倩文 黃伊娸 林羿茹 蕭郁儒",
    // "林子鈞 陳倩文 李宜庭 游秉中 賴佩昕 劉珆睿 魏翊如 李佳真 蕭郁儒 張晏瑄 李宜庭 黃伊娸 巫虹儀 侯柔含 嚴幼珊",
    // "陳倩文 林子鈞 葉育慈 嚴幼珊 李宜庭 賴佩昕 梁韶庭 蔡宗言 羅惟馨 劉珆睿 侯柔含 張晏瑄 賴佩昕 蕭郁儒 陳沛云",
    // "蕭郁儒 嚴幼珊 羅惟馨 葉育慈 李佳真 曾昀婷 賴佩昕 劉珆睿 林子鈞 林羿茹 葉宇倫 陳沛云 葉育慈 陳倩文 張晏瑄",
    // "嚴幼珊 蕭郁儒 林羿茹 陳倩文 陳巧文 張晏瑄 吳旭崧 顏雅帆 葉宇倫 黃伊娸 魏翊如 劉珆睿 李宜庭 梁韶庭 林子鈞",
    // "葉宇倫 魏翊如 吳旭崧 李宜庭 劉珆睿 葉育慈 張晏瑄 賴佩昕 嚴幼珊 陳巧文 蕭郁儒 顏雅帆 羅惟馨 陳冠廷 梁韶庭",
    // "魏翊如 葉宇倫 張晏瑄 巫虹儀 葉育慈 李宜庭 林子鈞 陳冠廷 劉珆睿 游秉中 嚴幼珊 賴佩昕 顏雅帆 陳巧文 林羿茹",
    // "李宜庭 黃伊娸 林子鈞 葉宇倫 陳倩文 魏翊如 侯柔含 游秉中 張晏瑄 巫虹儀 林子鈞 陳冠廷 嚴幼珊 葉育慈 賴佩昕",
    // "賴佩昕 蔡宗言 黃伊娸 李佳真 林子鈞 陳倩文 蕭郁儒 葉宇倫 侯柔含 陳沛云 葉育慈 魏翊如 陳倩文 游秉中 李宜庭",
    // "葉育慈 羅惟馨 陳倩文 蕭郁儒 魏翊如 葉宇倫 劉珆睿 陳沛云 梁韶庭 李佳真 賴佩昕 曾昀婷 蕭郁儒 李宜庭 蔡宗言",
    // "陳巧文 巫虹儀 顏雅帆 吳旭崧 嚴幼珊 李佳真 陳冠廷 林羿茹 陳沛云 葉宇倫 游秉中 羅惟馨 劉珆睿 魏翊如 侯柔含",
    // "巫虹儀 陳巧文 陳冠廷 魏翊如 陳沛云 黃伊娸 游秉中 侯柔含 蔡宗言 李宜庭 張晏瑄 梁韶庭 林子鈞 吳旭崧 羅惟馨",
    // "侯柔含 陳沛云 游秉中 林羿茹 蔡宗言 羅惟馨 李宜庭 巫虹儀 賴佩昕 吳旭崧 陳倩文 李佳真 曾昀婷 林子鈞 陳巧文",
    // "陳沛云 侯柔含 蔡宗言 黃伊娸 巫虹儀 吳旭崧 曾昀婷 葉育慈 陳巧文 賴佩昕 顏雅帆 蕭郁儒 李佳真 羅惟馨 陳倩文",
    // "羅惟馨 葉育慈 蕭郁儒 梁韶庭 曾昀婷 侯柔含 顏雅帆 吳旭崧 陳倩文 梁韶庭 陳冠廷 陳巧文 葉宇倫 陳沛云 巫虹儀",
    // "吳旭崧 李佳真 葉宇倫 陳巧文 顏雅帆 陳沛云 嚴幼珊 羅惟馨 陳冠廷 侯柔含 曾昀婷 林羿茹 游秉中 巫虹儀 劉珆睿",
    // "林羿茹 梁韶庭 嚴幼珊 侯柔含 陳冠廷 游秉中 李佳真 陳巧文 黃伊娸 蕭郁儒 劉珆睿 吳旭崧 蔡宗言 張晏瑄 魏翊如",
    // "黃伊娸 李宜庭 賴佩昕 陳沛云 游秉中 巫虹儀 蔡宗言 梁韶庭 林羿茹 嚴幼珊 梁韶庭 林子鈞 張晏瑄 曾昀婷 李佳真",
    // "李佳真 吳旭崧 劉珆睿 賴佩昕 蕭郁儒 陳巧文 林羿茹 林子鈞 曾昀婷 葉育慈 蔡宗言 侯柔含 陳沛云 顏雅帆 黃伊娸",
    // "梁韶庭 林羿茹 曾昀婷 羅惟馨 張晏瑄 顏雅帆 陳倩文 黃伊娸 葉育慈 羅惟馨 黃伊娸 巫虹儀 陳冠廷 嚴幼珊 葉宇倫"
];
const createPartner = async () => {
    var conn = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DB,
        port: process.env.DBPORT
    });

    for (let line of rawSchedule) {
        let cells = line.split(" ");
        // console.log(cells.length);
        // console.log(cells);
        if(cells.length != 15) {
            console.log("NUMBER NOT MATCH!");
        }
        else{
            let startDate = "2021-12-05 16:00:00.000000";
            for(let i=1; i<15; i++){
                console.log("");
                // console.log(cells[i]);
                let createPartnerSql = `INSERT INTO Partner (userId, partnerId, startTime, stopTime)
                    VALUES((SELECT userId FROM User WHERE name = "${cells[0]}"), 
                    (SELECT userId FROM User WHERE name = "${cells[i]}"),
                    TIMESTAMPADD(DAY, ${i-1}, "${startDate}"),
                    TIMESTAMPADD(DAY, ${i}, "${startDate}"))`;

                await conn.execute(createPartnerSql);
            }
        }
    }
    console.log("COMPLETE!!");
}

const main = async () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/api/hello', (req, res) => {
    res.json({
      hello: "world"
    });
  });

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log(`listening on ${port}`);

  await createPartner();
}

main();