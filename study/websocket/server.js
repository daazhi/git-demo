let ws = require("./nodejs-websocket/index");

let {MsgType} = require("./MsgType");

let connections = {}, users = {};

let server = ws.createServer(function (conn) {
    conn.on("text", function (str) {
        str = JSON.parse(str);
        console.log(str)
        let data = {
            time: now()
        };
        if (str.type === MsgType.open) {
            // connections[str.id] = conn;
            // users[str.id] = str.msg;

            data.from = '系统消息';
            data.msg = `【${str.msg}】登录成功`;
        } else {
            data.from = str.from;
            data.msg = `${str.msg}`;
        }
        broadcast(JSON.stringify(data));
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed", conn.key)
    })
    conn.on("error", function (err) {
        console.log("err", err)
    })
}).listen(8001);

function broadcast(msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

function now() {
    let date = new Date();
    let year = date.getFullYear()
    let month = String(date.getMonth() + 1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
    let hour = String(date.getHours()).padStart(2, '0')
    let minute = String(date.getMinutes()).padStart(2, '0')
    let second = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}