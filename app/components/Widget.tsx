"use client";

import React, { useEffect, useState } from "react";
import {WidgetInstance, WidgetCategory} from "../../lib/orchestrator";
import{ socket } from "../../socket"


export default function Widget() {
    const [data, setData] = useState<WidgetInstance[] | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);

        useEffect(() => { //server logik muss in eine eigene datei bitte danke gerngeschehen
            // Verbindung überwachen
            function onConnect() {
                setIsConnected(true);
            }

            function onDisconnect() {
                setIsConnected(false);
            }

            // Nachrichten vom Server empfangen
            function onServerMessage(data) {
                setMessages((prev) => [...prev, data]);
            }

            function onUserChange(user){
                setUser(user);
            }

            // Events registrieren
            socket.on("connect", onConnect);
            socket.on("disconnect", onDisconnect);
            socket.on("server-message", onServerMessage);
            socket.on("user-change", onUserChange)

            // Cleanup beim Unmount
            return () => {
                socket.off("connect", onConnect);
                socket.off("disconnect", onDisconnect);
                socket.off("server-message", onServerMessage);
                socket.off("user-change", onUserChange)
            };
        }, []);

    useEffect(() => {

        console.log("user")
        fetch("http://localhost:3000/api/bff/web")
            .then(res => res.json())
            .then(json => {
                setData(json);
                console.log(json)
            })
            .catch(() => setData(null));
    }, [user]);

    console.log(data)
    console.log("halo")
    console.log(messages)

    /* Skeleton */
    if (!data) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                    <div
                        key={index}
                        className="rounded-lg bg-white p-4 shadow-sm border space-y-3 animate-pulse">
                        <div className="h-5 w-1/2 bg-slate-200 rounded"/>
                        <div className="h-4 w-full bg-slate-200 rounded"/>
                        <div className="h-4 w-3/4 bg-slate-200 rounded"/>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {Object.entries(data).map(([category, group]) => {
                const widgets = (group as any).widgets;
                console.log('Category:', category); // Debug: Kategorie
                console.log('Widgets:', widgets); // Debug: Alle Widgets
                return (
                    Array.isArray(widgets) && widgets.length > 0 && (
                        <div key={category}>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                {WidgetCategory[category as keyof typeof WidgetCategory] || category}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {widgets.map((widget: WidgetInstance) => (
                                    <div
                                        key={widget.id}
                                        className="relative rounded-lg p-6 shadow-sm border w-full min-w-[250px] max-w-[460px]"
                                        style={{
                                            backgroundImage: widget.picture ? `url(${widget.picture})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundColor: widget.picture ? 'transparent' : 'white'
                                        }}>
                                        {widget.picture && (
                                            <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
                                        )}
                                        <div className="relative z-10">
                                            <h3 className={`text-lg font-semibold ${widget.picture ? 'text-white' : 'text-slate-900'}`}>
                                                {widget.id}
                                            </h3>
                                            <p className={`mt-2 text-base ${widget.picture ? 'text-white' : 'text-slate-700'}`}>
                                                {widget.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                );
            })}

            {Object.values(data).every(group => !(group as any).widgets || (group as any).widgets.length === 0) && (
                <p className="text-slate-700">Keine Widgets verfügbar.</p>
            )}
        </div>
    );
}