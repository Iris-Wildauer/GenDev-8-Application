"use client";

import { useEffect, useState } from "react";
import { socket } from "../../socket";
import { useSocketConnection } from "./socketConnection";

export function Usernames() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsername, setUser] = useState(null);
  const { user } = useSocketConnection();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_USERS)
      .then((res) => res.json())
      .then((json) => {
        setAllUsers(json.allUsers || json);

        if (json.currentUser) {
          setUser(json.currentUser);
        }
        console.log("Loaded users:", json);
      })
      .catch((err) => console.error("Failed to load users:", err));
  }, []);

  const sendUser = async (user) => {
    return await fetch(process.env.NEXT_PUBLIC_USERS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        method: "setUser",
        id: user.id,
        username: user.username,
        preferences: user.preferences,
        socketId: socket.id,
      }),
    });
  };

  const handleUserChange = (user) => {
    setUser(user);
    sendUser(user);
  };

  /*
  useEffect(() => {
    if (!selectedUsername) {
      console.log("Kein Username ausgewählt");
      return;
    }
    sendUser().then((response) => {
      console.log("Empfangene Daten:", response);
    });
  }, []);

   */

  useEffect(() => {
    if (user && user.id !== selectedUsername?.id) {
      setUser(user);
    }
  }, [user]);

  return (
    <>
      <details className="relative">
        <summary className="list-none cursor-pointer flex items-center gap-1">
          <span>{selectedUsername?.username || "Select User"}</span>
          <span aria-hidden>▾</span>
        </summary>

        <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-10">
          {allUsers.map((user) => (
            <button
              onClick={() => handleUserChange(user)}
              key={user.id}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {user.username}
            </button>
          ))}
        </div>
      </details>
    </>
  );
}
