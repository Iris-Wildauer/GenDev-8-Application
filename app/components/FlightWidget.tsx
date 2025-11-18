"use client";

import React, { useEffect, useState } from "react";

export default function FlightWidget() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/api/widgets")
            .then(res => res.json())
            .then(json => {
                console.log("API RESPONSE", json);
                setData(json);
            })
            .catch(() => setData(null));
    }, []);

    if (!data) {
        return (
            <div className="rounded-lg bg-white p-4 shadow-sm border space-y-3 animate-pulse">
                <div className="h-5 w-32 bg-slate-200 rounded" />
                <div className="h-4 w-full bg-slate-200 rounded" />
                <div className="h-4 w-2/3 bg-slate-200 rounded" />
            </div>
        );
    }

    return (
        <div className="rounded-lg bg-white p-4 shadow-sm border">
            <p className="mt-1 text-xs text-slate-600">
                {data.id}, {data.title}
            </p>
        </div>
    );
}
