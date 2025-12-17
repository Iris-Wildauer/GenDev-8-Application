import {useEffect, useState} from "react";
import {socket} from "../../socket";

export function useSocketConnection(){
const [isConnected, setIsConnected] = useState(false);
const [messages, setMessages] = useState([]);
const [user, setUser] = useState(null);

useEffect(() => {
    function onConnect() {
        setIsConnected(true);
    }

    function onDisconnect() {
        setIsConnected(false);
    }

    function onServerMessage(data) {
        setMessages((prev) => [...prev, data]);
    }

    function onUserChange(user){
        setUser(user);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("server-message", onServerMessage);
    socket.on("user-change", onUserChange)

    return () => {
        socket.off("connect", onConnect);
        socket.off("disconnect", onDisconnect);
        socket.off("server-message", onServerMessage);
        socket.off("user-change", onUserChange)
    };
}, []);

return { user, isConnected, messages}
}
