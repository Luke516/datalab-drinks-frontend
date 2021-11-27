const express = require('express');
var cors = require('cors');
const path = require('path');
const mysql = require('mysql2/promise');
const { fetchParticipantRowsFromSheet, fetchParticipantGroupsFromSheet } = require('./sheet');
require('dotenv').config();

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

  app.post('/api/import', async (req, res) => {
    console.log(req.body);

    var conn = await mysql.createConnection({
      host: process.env.DBHOST,
      user: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: process.env.DB,
      port: process.env.DBPORT
    });

    const importSql = ` WHERE userId = ?`;
    try {
      await conn.execute(importSql, [0] /* params */);
    }
    catch (err) {
      console.log("err");
      console.log(err);
    }
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

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
  });

  const port = process.env.PORT || 5000;
  app.listen(port);

  console.log(`listening on ${port}`);
}

main();