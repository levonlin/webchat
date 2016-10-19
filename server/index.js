var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 5000 });
 
function handleReq(req) {
    reqJSON = JSON.parse(req);
    switch (reqJSON.type) {
        case 'login': 
            return '{"type": "welcome", "msg": "用户' + reqJSON.user + '已登录"}';
        default : 
            return req;
    }
}

wss.on('connection', function (ws) {
    ws.on('message', function (req) {
        console.log('received: %s', req);

        var res = handleReq(req);

        wss.clients.forEach(function (client) {
            client.send(res);
        });
    });
 });