const express = require('express');
var cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const { fetchParticipantRowsFromSheet, fetchParticipantGroupsFromSheet } = require('./sheet');
require('dotenv').config();

const getAvatarUrl = (testerId) => {
  let bucket = "https://flora-experiment.s3.us-west-2.amazonaws.com/avatar/";
  let filenames = ["89.jpg", "32.png", "128.jpg", "129.jpg", "1.jpg", "10.jpeg", "100.jpg", "101.jpg", "102.jpg", "103.jpg", "104.jpg", "105.png", "106.jpg", "107.jpg", "108.png", "11.jpeg", "110.png", "111.png", "113.jpg", "114.png", "116.png", "117.png", "118.png", "119.png", "12.jpg", "120.png", "121.png", "122.png", "125.png", "126.jpeg", "127.png", "13.jpg", "14.jpeg", "15.jpg", "16.jpeg", "17.jpeg", "18.jpeg", "19.jpeg", "2.jpeg", "20.jpeg", "21.jpeg", "22.jpeg", "23.png", "24.png", "25.jpg", "26.jpg", "27.jpg", "28.jpeg", "29.jpeg", "3.jpg", "30.jpeg", "31.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg", "39.jpeg", "39.jpg", "4.jpeg", "40.jpg", "41.jpg", "42.jpg", "43.jpg", "44.jpg", "45.jpg", "46.jpg", "47.jpg", "48.jpg", "49.jpg", "5.jpg", "50.jpg", "51.jpg", "52.jpg", "53.jpg", "54.jpg", "55.jpg", "56.jpg", "57.jpg", "58.jpg", "58.png", "59.jpg", "6.jpeg", "60.jpg", "61.jpg", "62.jpg", "63.jpg", "64.png", "65.jpg", "66.jpg", "67.jpg", "68.jpg", "69.jpg", "7.png", "70.jpg", "71.jpg", "72.jpg", "73.jpg", "75.jpg", "76.jpg", "77.jpg", "78.jpg", "79.jpg", "8.png", "80.jpg", "81.jpg", "82.jpg", "83.jpg", "84.jpg", "85.jpg", "86.jpg", "87.jpg", "88.jpg", "9.jpeg", "90.jpg", "91.jpg", "92.jpg", "93.jpg", "94.jpg", "95.jpg", "96.jpg", "97.jpg", "98.jpg", "99.jpg"];

  for(filename of filenames){
    if(filename.split(".")[0] === "" + testerId) {
      return bucket + filename;
    }
  }

  return "QWQ";
}

const createPartner = async (email, group, conn) => {
  
  let createPartnerSql = `INSERT INTO Partner (userId, partnerId, startTime, stopTime) 
    VALUES((SELECT userId FROM User WHERE email = "${email}"), 1, FROM_UNIXTIME(0), FROM_UNIXTIME(1))`;

  // console.log(createPartnerSql);

  await conn.execute(createPartnerSql);
}

const createGoal = async (email, group, conn) => {
  let createFields = ["userId", "title", "duration", "goal", "progress", "repeatType", "startedAt"];
  let createValues = [`(SELECT userId FROM User WHERE email = "${email}")`, `"使用Fauna專注"`, 25, 8, 0, 3, `"2021-12-02 16:00:00"`];
  if(group == "Individual Goal"){
    createFields.push("challengeId");
    createValues.push(3);
  }
  else if (group.includes("Group")){
    createFields.push("challengeId");
    createValues.push(4);
  }
  let createGoalSql = `INSERT INTO Goal (${createFields.join(",")}) 
    VALUES(${createValues.map(val => "" + val).join(",")})`;

  // console.log(createGoalSql);

  await conn.execute(createGoalSql);
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

  app.post('/api/clear', async (req, res) => {
    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    // const deleteGoalSql = `DELETE FROM Goal WHERE userId IN (SELECT userId FROM User WHERE testerId > 0)`;
    // const deletePartnerSql = `DELETE FROM Partner WHERE userId IN (SELECT userId FROM User WHERE testerId > 0)`;
    // const deleteUserSql = `DELETE FROM User WHERE testerId > 0`;
    
    // try {
    //   await conn.execute(deleteGoalSql);
    //   await conn.execute(deletePartnerSql);
    //   await conn.execute(deleteUserSql);
    // }
    // catch(err){
    //   console.log(err);
    // }
    conn.close();

    res.status(200).send({ ok: "ok" });
  });

  app.post('/api/import', async (req, res) => {
    // console.log(req.body);

    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    // let {data, group} = req.body;
    // if(group == "Focus Only") {
    //   let userType = 0;
    //   const importSql = `INSERT INTO User (name, email, password, gender, school, department, expertise, habit, intro, avatarUrl, testerId, userType)
    //     VALUES("${data["姓名"]}", "${data["信箱"]}", "${data["手機號碼"]}", "${data["性別"]}", "${data["學校"]}", "${data["科系"]}",
    //     "${data["專長"]}", "${data["興趣"]}", "哈囉我是${data["姓名"]}", "${getAvatarUrl(data["ID"])}", ${data["ID"]}, ${userType})`;
    //   try {
    //     await conn.execute(importSql);
    //     await createGoal(data["信箱"], group, conn);
    //   }
    //   catch (err) {
    //     console.log("err");
    //     console.log(err);
    //   }
    // }
    // else if(group.includes("Group")) {
    //   let userType = 3;
    //   let groupId = parseInt(group.split(" ")[1]) + 2;
    //   const importSql = `INSERT INTO User (groupId, name, email, password, gender, school, department, expertise, habit, intro, avatarUrl, testerId, userType)
    //     VALUES(${groupId}, "${data["姓名"]}", "${data["信箱"]}", "${data["手機號碼"]}", "${data["性別"]}", "${data["學校"]}", "${data["科系"]}",
    //     "${data["專長"]}", "${data["興趣"]}", "哈囉我是${data["姓名"]}", "${getAvatarUrl(data["ID"])}", ${data["ID"]}, ${userType})`;
    //   try {
    //     await conn.execute(importSql);
    //     await createGoal(data["信箱"], group, conn);
    //   }
    //   catch (err) {
    //     console.log("err");
    //     console.log(err);
    //   }
    // }
    // else if (group == "Individual Goal"){
    //   let userType = 1;
    //   const importSql = `INSERT INTO User (name, email, password, gender, school, department, expertise, habit, intro, avatarUrl, testerId, userType)
    //     VALUES("${data["姓名"]}", "${data["信箱"]}", "${data["手機號碼"]}", "${data["性別"]}", "${data["學校"]}", "${data["科系"]}",
    //     "${data["專長"]}", "${data["興趣"]}", "哈囉我是${data["姓名"]}", "${getAvatarUrl(data["ID"])}", ${data["ID"]}, ${userType})`;
    //   try {
    //     await conn.execute(importSql);
    //     await createGoal(data["信箱"], group, conn);
    //   }
    //   catch (err) {
    //     console.log("err");
    //     console.log(err);
    //   }
    // }
    // else if(group.includes("Match")) {
    //   let userType = 2;
    //   const importSql = `INSERT INTO User (name, email, password, gender, school, department, expertise, habit, intro, avatarUrl, testerId, userType)
    //     VALUES("${data["姓名"]}", "${data["信箱"]}", "${data["手機號碼"]}", "${data["性別"]}", "${data["學校"]}", "${data["科系"]}",
    //     "${data["專長"]}", "${data["興趣"]}", "哈囉我是${data["姓名"]}", "${getAvatarUrl(data["ID"])}", ${data["ID"]}, ${userType})`;
    //   try {
    //     await conn.execute(importSql);
    //     await createGoal(data["信箱"], group, conn);
    //     await createPartner(data["信箱"], group, conn);
    //   }
    //   catch (err) {
    //     console.log("err");
    //     console.log(err);
    //   }
    // }
    conn.close();

    res.json(req.body);
  });

  app.get('/api/participants', async (req, res) => {
    let {headerValues, rows: participantRows} =  await fetchParticipantRowsFromSheet();
    // console.log(participantRows[0]);
    // console.log(headerValues);
    // console.log(participantRows[0]["專長"]);

    participantRows =  participantRows.map((row) => {
      let payload = {};
      for (let header of headerValues){
        payload[header] = row[header];
      }
      return payload;
    });
    
    let response = {
      headerValues,
      rows: participantRows
    }
    res.json(response);
  });

  app.get('/api/groups', async (req, res) => {
    let {headerValues, rows: participantRows} =  await fetchParticipantGroupsFromSheet();
    console.log(participantRows[0]);
    console.log(headerValues);
    // console.log(participantRows[0]["專長"]);

    participantRows =  participantRows.map((row) => {
      let payload = {};
      for (let header of headerValues){
        payload[header] = row[header];
      }
      return payload;
    });
    
    let response = {
      headerValues,
      rows: participantRows
    }
    res.json(response);
  });

  app.post('/api/groups', async (req, res) => {
    let {headerValues, rows: participantRows} =  await fetchParticipantGroupsFromSheet();
    let {headerValues: headerValues2, rows: participantRows2} =  await fetchParticipantRowsFromSheet();
    // console.log(participantRows[0]);
    // console.log(headerValues);

    participantRows =  participantRows.map((row) => {
      let payload = {};
      for (let header of headerValues){
        payload[header] = row[header];
      }
      return payload;
    });
    
    let response = {
      headerValues,
      rows: participantRows
    }
    res.json(response);
  });

  app.get('/api/events/sections', async (req, res) => {
    let userSection = "全部";
    if(req.query.type) {
      console.log(req.query.type);
      userSection = req.query.type;
    }
    if(userSection == "全部"){
      res.status(200).send([]);
    }

    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    let payload = [];

    let getSubSectionsSql = 
      userSection == "使用者"? `SELECT \`name\` AS Val FROM flora_test.User WHERE testerId > 0 GROUP BY \`name\` ORDER BY \`userId\` `:
      userSection == "實驗組"? `SELECT \`userType\` AS Val FROM flora_test.User WHERE testerId > 0 GROUP BY \`userType\` ORDER BY \`userType\` `: 
      userSection == "小組"? `SELECT \`groupId\` AS Val FROM flora_test.User WHERE testerId > 0 AND groupId > 0 GROUP BY \`groupId\` ORDER BY \`groupId\` `: 
      `` 
    try {
      let [rows, fields] = await conn.execute(getSubSectionsSql);
      if(rows.length === 0){
          throw `No Event Types.`;
      }
      for(let row of rows) {
        payload.push(row["Val"]);
      }
    }
    catch(err){
      console.log(err);
      payload = [];
    }

    conn.close();
    res.status(200).send(payload);
  });

  app.get('/api/events/types', async (req, res) => {
    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    let payload = [];

    let getEventTypes = `SELECT \`key\` FROM flora_test.Log GROUP BY \`key\` ORDER BY \`key\` `;
    try {
      let [rows, fields] = await conn.execute(getEventTypes);
      if(rows.length === 0){
          throw `No Event Types.`;
      }
      for(let row of rows) {
        payload.push(row["key"]);
      }
    }
    catch(err){
      console.log(err);
    }

    conn.close();
    res.status(200).send(payload);
  });

  app.get('/api/events', async (req, res) => {
    let eventType = "All";
    let section = "All";
    let subSection = "";
    let metric = "day";
    let start = -1;
    let end = -1;
    let groupFunc = "COUNT";
    if(req.query.event) {
      console.log(req.query.event);
      eventType = req.query.event;
    }
    if(req.query.section) {
      console.log(req.query.section);
      section = req.query.section;
    }
    if(req.query.subSection) {
      console.log(req.query.subSection);
      subSection = req.query.subSection;
    }
    if(req.query.metric) {
      console.log(req.query.metric);
      metric = req.query.metric;
    }
    if(req.query.start) {
      console.log(req.query.start);
      start = parseInt(req.query.start);
    }
    if(req.query.end) {
      console.log(req.query.end);
      end = parseInt(req.query.end);
    }
    if(req.query.groupFunc) {
      console.log(req.query.groupFunc);
      groupFunc = req.query.groupFunc;
    }
    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    let payload = {};
    if(groupFunc == "GROUP") {
      payload = {
        type: "grouped",
        data: {}
      }
    }

    let getLogSql = (groupFunc == "SUM") ? `SELECT SUM( CAST(stringVal AS UNSIGNED) ) as logCount,`:
      (groupFunc == "AVG") ? `SELECT AVG( CAST(stringVal AS UNSIGNED) ) as logCount,`:
      `SELECT COUNT(stringVal) as logCount,`

    getLogSql += ` \`timestamp\`, \`stringVal\`,
        DAY(CONVERT_TZ(\`timestamp\`, '+00:00','+08:00')) as logDay,
        HOUR(CONVERT_TZ(\`timestamp\`, '+00:00','+08:00')) as logHour 
        FROM Log WHERE \`timestamp\` > "2021-12-05 16:00:00.000000"`
    if(eventType != "All" && eventType != "all"){
      getLogSql += ` AND \`key\`= "${eventType}" `
    }

    if(section == "小組") {
      getLogSql += ` AND userId IN (SELECT userId FROM User WHERE groupId=${subSection})`
    }
    else if(section == "實驗組") {
      getLogSql += ` AND userId IN (SELECT userId FROM User WHERE userType=${subSection} AND testerId > 0)`
    }
    else if(section == "使用者") {
      getLogSql += ` AND userId = (SELECT userId FROM User WHERE name="${subSection}")`
    }
    else {
      getLogSql += ` AND userId IN (SELECT userId FROM User WHERE testerId > 0)`
    }

    getLogSql += (metric == "day") ? ` GROUP BY logDay`: ` GROUP BY logDay, logHour`;
    if(groupFunc == "GROUP") {
      getLogSql += ", stringVal"
    }
    if(start >= 0 && end >= 0 && end >= start) {
      getLogSql += ` HAVING logDay >= ${start + 6} AND logDay <= ${end + 6}`
    }

    console.log(getLogSql);
    try {
      let [rows, fields] = await conn.execute(getLogSql);
      if(rows.length === 0){
          throw `No Log.`;
      }
      for(let row of rows) {
        if(groupFunc == "GROUP") {
          if(! (row["stringVal"] in payload.data)) {
            payload.data[row["stringVal"]] = {};
          }
          if(metric == "day") payload.data[row["stringVal"]]["12/" + row["logDay"]] = row["logCount"];
          else payload.data[row["stringVal"]][`12/${row["logDay"]}(${row["logHour"]})`] = row["logCount"];
        }
        else {
          if(metric == "day") payload["12/" + row["logDay"]] = row["logCount"];
          else payload[`12/${row["logDay"]}(${row["logHour"]})`] = row["logCount"];
        }
      }
    }
    catch(err){
      console.log(err);
    }

    conn.close();
    res.status(200).send(payload);
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log(`listening on ${port}`);
}

main();