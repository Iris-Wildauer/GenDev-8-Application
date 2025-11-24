"use client";

import React, { useEffect, useState } from "react";

export default function Widget() {
    const [data, setData] = useState(null);

    const sleep = (milliseconds: number) =>  {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    useEffect(() => {
        fetch("http://localhost:3000/api/widgets/")
            .then(res => res.json())
            .then(async json => {
                await sleep(1000);
                setData(json);
                console.log(json)
            })
            .catch(() => setData(null));
    }, []);

    /* Skeleton */
    if (!data) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                    <div
                        key={index}
                        className="rounded-lg bg-white p-4 shadow-sm border space-y-3 animate-pulse">
                        <div className="h-5 w-1/2 bg-slate-200 rounded" />
                        <div className="h-4 w-full bg-slate-200 rounded" />
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!!data.widget && data.widget.length > 0 ? (
                data.widget.map((widget, i) => (
                    <div
                        key={i}
                        className="rounded-lg bg-white p-6 shadow-sm border w-full min-w-[250px] max-w-[460px]">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {widget.id}
                        </h2>
                        <p className="mt-2 text-base text-slate-700">
                            {widget.title}
                        </p>
                    </div>
                ))
            ) : (
                <p className="text-slate-700">Keine Widgets verfügbar.</p>
            )}
        </div>
    );
}
