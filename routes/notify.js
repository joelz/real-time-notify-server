var express = require('express');
var router = express.Router();

var statusObj = require('../config/status');

//有to_id则发送给单个client
//有to_room则广播给该room的所有的client
router.post('/:eventName', function (req, res, next) {

  console.log(JSON.stringify(req.body));

  if (req.body.to_id) {

    var to_id = req.body.to_id;
    res.io.to(to_id).emit(req.params.eventName, req.body);

  }else if (req.body.to_room){
    
    var to_room = req.body.to_room;
    res.io.in(to_room).emit(req.params.eventName, req.body);

  }

  res.status(200);
  res.json(statusObj.Success);

});

module.exports = router;
