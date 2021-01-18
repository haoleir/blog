const express = require('express');
const app = express();

app.listen(8001, _ => {
  console.log('ok');
});

app.get('/list', function(req, res) {
  let { callback = Function.prototype } = req.query;
  let data = {
    resCode: 200,
    resMsg: '珠峰培训'
  };
  res.send(`${callback}(${JSON.stringify(data)})`);
});
