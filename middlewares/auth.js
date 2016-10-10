/*

1.两个自定义Header：
Date: 2016-10-09T08:07:24+00:00
Authorization: RTNS AppId;Salt;Hash

2.Date Header的内容为发送请求服务器的UTC时间，格式为2016-10-09T08:07:24+00:00
注意：为防止重放攻击，该时间与本Server时间相差不能超过10分钟。

3.Authorization Header为验证票据。
RTNS前缀后为一个空格。
Salt为随机字符串，建议为长度10位的数字字母。
Hash的计算方法为：hash('sha1', appKey + "&" + dateHeader + "&" + salt)

 */

var timeSpanInMin = 5;

var statusObj = require('../config/status');
var appList = require('../config/appList');
var moment = require('moment');

var crypto = require('crypto');

//var algs = [ 'md5','sha','sha1','sha256','sha512','RSA-SHA','RSA-SHA1','RSA-SHA256','RSA-SHA512'];
var hashAlgs = 'sha1';

function hash(algorithm, str) {
    var shasum = crypto.createHash(algorithm);
    shasum.update(str);
    return shasum.digest('base64');
}

function checkUrl(url, authUrlList) {

    var isValid = false;

    authUrlList.forEach(function (n) {
        if (n && (new RegExp("^" + n)).test(url)) {
            isValid = isValid || true;
        }
    })

    return isValid;
}

module.exports = function (req, res, next) {

    var authHeader = req.headers['authorization'];
    var dateHeader = req.headers['date'];

    if (!authHeader) {
        res.status(403);
        res.json(statusObj.AuthHeaderMissing);

        return;
    }

    if (!dateHeader) {
        res.status(403);
        res.json(statusObj.DateHeaderMissing);

        return;
    }

    //moment("2016-10-09T08:07:24+00:00").isBetween(moment.utc().subtract(5,'m'),moment.utc().add(5,'m'))
    // 时间限定为前后10分钟范围内，防止重放攻击
    if (!moment(dateHeader).isBetween(moment.utc().subtract(timeSpanInMin, 'm'), moment.utc().add(timeSpanInMin, 'm'))) {
        res.status(403);
        res.json(statusObj.DateHeaderInvalid);
        return;
    }

    try {

        var arr = authHeader.split(" ")[1].split(";");
        var appId = arr[0];
        var salt = arr[1];
        var sha1Str = arr[2];

        if (!appList[appId]) {
            res.status(403);
            res.json(statusObj.AppIdNotExists);
            return;
        }

        //请求的url必须在AuthorizationURLs中
        if (!checkUrl(req.originalUrl, appList[appId].AuthorizationURLs)) {
            res.status(403);
            res.json(statusObj.UrlInvalid);
            return;
        }

        var appKey = appList[appId].AppKey;

        //console.log(hash(hashAlgs, appKey + "&" + dateHeader + "&" + salt));

        if (hash(hashAlgs, appKey + "&" + dateHeader + "&" + salt) != sha1Str) {
            res.status(403);
            res.json(statusObj.InvaildAuthHeader);
            return;
        }

        next();

    } catch (err) {
        res.status(500);
        res.json(statusObj.AuthHeaderParseError);
    }

};

