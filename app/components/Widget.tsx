"use client";

import React, { useEffect, useState } from "react";
import {WidgetInstance, WidgetCategory} from "../../lib/widgets/orchestrator";

export default function Widget() {
    const [data, setData] = useState<WidgetInstance[] | null>(null);

    const sleep = (milliseconds: number) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

    useEffect(() => {
        fetch("http://192.168.178.53:3000/api/bff/web")
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
            {Object.entries(data).map(([category, widgets]) => (
                Array.isArray(widgets) && widgets.length > 0 && (
                    <div key={category}>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            {WidgetCategory[category] || category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {widgets.map((widget: WidgetInstance) => (
                                <div
                                    key={widget.id}
                                    className="rounded-lg bg-white p-6 shadow-sm border w-full min-w-[250px] max-w-[460px]">
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        {widget.id}
                                    </h3>
                                    <p className="mt-2 text-base text-slate-700">
                                        {widget.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}

            {Object.values(data).every(widgets => !widgets) && (
                <p className="text-slate-700">Keine Widgets verfügbar.</p>
            )}
        </div>
    );
}