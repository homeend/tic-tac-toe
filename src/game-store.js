import {readable}  from 'svelte/store';

let connection_socket;
let connection_timer = -1;
let message;

const connect = () =>{
    console.log('connection_timer', connection_timer);
    try{
        if(!connection_socket || connection_socket.readyState >= 2){
            connection_socket = new WebSocket(process.env.ws_url);
            connection_socket.onclose = (e) => {
                console.log('close socket', e);
                if(connection_timer == -1){
                    connection_timer = setInterval(() =>{
                        connect();
                    }, 500);
                }
            };
            connection_socket.onopen = () => {
                clearInterval(connection_timer);
                connection_timer = -1;
                console.log('connected');
            };
            connection_socket.onmessage = (evt) => {
                message = evt.data;
            }
        }        
    }
    catch(ex){
        console.log('server error', ex);
    }

};

const store = new readable(undefined, (set) => {
    const message_reader_interval = setInterval(() => {
        if(message){
            set(JSON.parse(message));
            message = undefined;
        }
    }, 5);
    
    return () => {
        if(connection_socket){
            connection_socket.close();
        }
        clearInterval(message_reader_interval);
    }
});

connect();

export default {
    subscribe: (callback) => {
        const subscriber = store.subscribe((data) => {
            if (data != undefined){
                callback(data);
            }
        });
        console.log('subscriber', subscriber);
    },
    isConnect: () => connection_socket.readyState <= 1,
}