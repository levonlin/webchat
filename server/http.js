var http = require('http'),
    fs = require('fs');

function createHttpServer(port) {
    console.log('Run http in port: ' + port);

    http.createServer(function (req, res) {
        fs.readFile(__dirname + '/html/index.html', function (error, data) {
            if(error) {
                res.writeHead(500, {"Content-Type": "text/plain"});
                res.write(error + "\n");
                res.end();
             } else {
                data.toString();
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(data);
                res.end();
             }
        });
    }).listen(port);    
}

module.exports = createHttpServer;
