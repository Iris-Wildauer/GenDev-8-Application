"use client";

import React, { useEffect, useState } from "react";

export default function Widget() {
    const [data, setData] = useState(null);

function Sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

    useEffect(() => {
        fetch("/api/widgets")
            .then(res => res.json())
            .then(async json => {
                const firstWidget = json.widget[0];
                await Sleep(1000);
                setData(json);
                console.log(json)
                console.log(firstWidget)
            })
            .catch(() => setData(null));
    }, []);

    /*Skeleton*/
    if (!data) {
        return (
            <div className="rounded-lg bg-white p-4 shadow-sm border space-y-3 animate-pulse">
                <div className="h-5 w-32 bg-slate-200 rounded"/>
                <div className="h-4 w-full bg-slate-200 rounded"/>
                <div className="h-4 w-2/3 bg-slate-200 rounded"/>
            </div>
        );
    }

    return (
        <div className="flex flex-wrap justify-between gap-4">
            {data.widget && data.widget.length > 0 ? (
                data.widget.map((widget, i) => (
                    <div
                        key={i}
                        className="flex-grow rounded-lg bg-white p-4 shadow-sm border min-w-[150px] max-w-[300px] sm:min-w-[200px] h-auto"
                    >
                        <h2 className="text-lg font-semibold text-slate-900">{widget.id}</h2>
                        <p className="mt-2 text-base text-slate-700">{widget.title}</p>
                    </div>
                ))
            ) : (
                <p className="text-slate-700">Keine Widgets verfügbar.</p>
            )}
        </div>
    );
}
