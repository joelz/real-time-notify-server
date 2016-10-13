module.exports = {
    "Success": { "code": 200, "message": "请求成功" },
    "AuthHeaderMissing": { "code": 4001, "message": "缺少Authrization Header" },
    "InvaildAuthHeader": { "code": 4002, "message": "Authrization Header 不合法" },
    "AppIdNotExists": { "code": 4003, "message": "AppId不存在" },
    "AuthHeaderParseError": { "code": 4004, "message": "Authrization Header解析出错" },
    "DateHeaderMissing": { "code": 4005, "message": "缺少Date Header" },
    "DateHeaderInvalid": { "code": 4006, "message": "Date Header不合法。与Server的时间相差超过10分钟" },
    "UrlInvalid": { "code": 4007, "message": "请求的URL不在AuthorizationURLs列表中" }
};

