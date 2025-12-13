"use client";

import {useEffect, useState} from "react";

export function Usernames() {
    const [allUsers, setAllUsers] = useState([])
    const [selectedUsername, setUser]  = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/bff/user/")
            .then(res => res.json())
            .then(json => {
                setAllUsers(json);
            })
    }, []);

    const sendUser = async () => {
        return await fetch("http://localhost:3000/api/bff/user/", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: selectedUsername.id,
                username: selectedUsername.username,
                preferences: selectedUsername.preferences,})
        })
    }

    useEffect(() => {
        if (!selectedUsername) {
            console.log("Kein Username ausgewählt");
            return;
        }
        sendUser().then(response => {
            console.log("Empfangene Daten:", response);

        });
    }, [selectedUsername]);

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
                            onClick={() => setUser(user)}
                            key={user.id}
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                            {user.username}
                        </button>
                    ))}
                </div>
            </details>
        </>
    );
}