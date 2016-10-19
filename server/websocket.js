var WsServer = require('ws').Server;

function handleReq(req) {
    reqJSON = JSON.parse(req);
    switch (reqJSON.type) {
        case 'login': 
            return '{"type": "welcome", "msg": "用户' + reqJSON.user + '已登录"}';
        default : 
            return req;
    }
}

function createWsServer(port) {
    var wss = new WsServer({ port: port });
    console.log('Run websocket in port: ' + port);

    wss.on('connection', function (ws) {
        ws.on('message', function (req) {
            console.log('received: %s', req);

            var res = handleReq(req);

            wss.clients.forEach(function (client) {
                client.send(res);
            });
        });
     });
}

module.exports = createWsServer;
