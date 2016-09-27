var express = require('express');
var router = express.Router();


router.post('/msg', function (req, res, next) {

  if (req.body.to_id) {
    var to_id = req.body.to_id;
    var msg = req.body.msg;
    var dt = req.body.dt;

    console.log(msg);

    res.io.to(to_id).emit("incoming-msg", { "msg": msg, "dt": dt });
  }

  res.send('respond with a resource');

});

module.exports = router;
