var ws = require("./nodejs-websocket/index");

var server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        conn.sendText(str.toUpperCase())
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
    conn.on("error", function (err) {
        console.log("err", err)
    })
}).listen(8001);

function broadcast(server, msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}