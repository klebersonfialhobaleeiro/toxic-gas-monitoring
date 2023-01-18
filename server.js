import http from 'http'
import nStatic from 'node-static'

var fileServer = new nStatic.Server('./dist');

http.createServer(function (req, res) {
    
    fileServer.serve(req, res);

}).listen(5000);