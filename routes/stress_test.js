var express = require('express');
var router = express.Router();

var statusObj = require('../config/status');
var appList = require('../config/appList');

router.post('/:eventName', function (req, res, next) {

    console.log(JSON.stringify(req.body));

    if (appList['TEST-APP']) {
        res.io.emit(req.params.eventName, req.body);

        res.status(200);
        res.json(statusObj.Success);
    } else {
        res.status(403);
        res.json(statusObj.AuthHeaderMissing);
    }

});

module.exports = router;
