
/*


*/


var SERVER_URL = require('./config.js').ServerUrl;
var request = require('superagent');

var idx;

function runTrial(broadcastCount, delay, callback) {
    for (idx = 0; idx < broadcastCount; ++idx) {
        (function (idx) {
            setTimeout(function () {
                
                console.log(idx);

                request
                    .post(SERVER_URL + 'stress-test/update')
                    .send({ timeStamp: new Date().getTime() })
                    .set('X-API-Key', 'foobar')
                    .end(function (err, res) {
                        if (err || !res.ok) {
                            console.log('Oh no! error');
                        } else {
                            console.log('you got ' + JSON.stringify(res.body));
                        }
                    });

                if (idx === broadcastCount - 1) {
                    setTimeout(callback, delay)
                }

            }, idx * delay);
        } (idx));
    }
}

runTrial(10, 5000, function () {
    runTrial(10, 2000, function () {
        runTrial(10, 1000);
    });
});


