"use client";

import {getAllUsers} from "../../lib/users";
import {useState} from "react";

export function Usernames() {
    const [selectedUsername, setUser]  = useState<string | null>(null);

    return (
        <>
            <details className="relative">
                <summary className="list-none cursor-pointer flex items-center gap-1">
                    <span>{selectedUsername || "Select User"}</span>
                    <span aria-hidden>▾</span>
                </summary>

                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-10">
                    {getAllUsers().map((user) => (
                        <button
                            onClick={() => setUser(user.username)}
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