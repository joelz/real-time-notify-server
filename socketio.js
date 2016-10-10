/* 

系统事件以 sys_ 开头。
发送给所有的客户端。


所有业务系统的client都连接到默认的namespace中；
各个业务系统可以自己定义不同的room。
*/

module.exports = function(app, server, io) {
	
    // Add an event listener to the 'connection' event
    io.on('connection', function (socket) {
        
        try {
            var room = socket.handshake['query']['r_var'];
            console.log(room);
            socket.join(room);
        }
        catch(e){

        }

        socket.emit('sys_update_id', socket.id);
    });

};