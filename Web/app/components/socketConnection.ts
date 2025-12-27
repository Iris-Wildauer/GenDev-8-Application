import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";

export function useSocketConnection() {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [dataChange, setDataChange] = useState(0);
  const userUpdateResolvers = useRef([]);

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

      userUpdateResolvers.current.forEach((resolve) => resolve(user));
      userUpdateResolvers.current = [];
    }

    async function onOrderChange(order) {
      console.log("widgetOrderUpdated:", order);
      let currentUser = user;
      if (!currentUser) {
        console.log("Waiting for user update before processing order...");

        currentUser = await new Promise((resolve) => {
          userUpdateResolvers.current.push(resolve);

          setTimeout(() => {
            const index = userUpdateResolvers.current.indexOf(resolve);
            if (index > -1) {
              userUpdateResolvers.current.splice(index, 1);
              console.warn("User update timeout, processing order anyway");
              resolve(null);
            }
          }, 5000);
        });
      }

      console.log("Processing order change with user:", currentUser?.username);
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
