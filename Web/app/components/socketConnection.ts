import { useEffect, useState } from "react";
import { socket } from "../../socket";

export function useSocketConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [dataChange, setDataChange] = useState(0);

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

    function onUserChange(user) {
      setUser(user);
    }

    function onOrderChange(order) {
      console.log("widgetOrderUpdated:", order);
      setDataChange((prev) => prev + 1);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("server-message", onServerMessage);
    socket.on("user-change", onUserChange);
    socket.on("widgetOrderUpdated", onOrderChange);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("server-message", onServerMessage);
      socket.off("user-change", onUserChange);
      socket.off("widgetOrderUpdated", onOrderChange);
    };
  }, []);

  return { user, isConnected, messages, dataChange };
}
