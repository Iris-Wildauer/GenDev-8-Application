"use client";

import React, { useEffect, useState } from "react";
import {WidgetInstance, WidgetCategory} from "../../lib/widgetDefinitions";
import{ socket } from "../../socket"
import { useSocketConnection } from "./socketConnection"


export default function Widget() {
    const { user, isConnected, messages } = useSocketConnection();
    const [data, setData] = useState<WidgetInstance[] | null>(null);

    useEffect(() => {

        console.log("user")
        fetch(process.env.NEXT_PUBLIC_WEBBFF)
            .then(res => res.json())
            .then(json => {
                setData(json);
                console.log("ist hier style drin is die frage")
                console.log(json)
            })
            .catch(() => setData(null));
    }, [user]);

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
                const design = group.design

                console.log("logging");
                console.log(design);

                if (!Array.isArray(widgets) || widgets.length === 0) {
                    return null;
                }

                if (design === "style1") {
                    return (
                        <div key={category}>
                            <h2 className="text-xl font-bold text-slate-900 mb-4">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {widgets.map((widget: any) => (
                                    <div
                                        key={widget.id}
                                        className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full min-w-[250px] max-w-[460px] bg-white">
                                        <div className="h-48 overflow-hidden">
                                            <div
                                                className="h-full w-full bg-cover bg-center transition duration-600 ease-in-out hover:scale-110"
                                                style={{
                                                    backgroundImage: widget.picture
                                                        ? `url("${process.env.NEXT_PUBLIC_PICTURES}${widget.picture}")`
                                                        : "linear-gradient(to top right, #4c1d95, #0369a1, #22d3ee)",
                                                }}/>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">
                                                {widget.title}
                                            </h3>
                                            <p className="text-sm text-slate-600">{widget.id}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }

                return (
                    <div key={category}>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {widgets.map((widget: any) => (
                                <div
                                    key={widget.id}
                                    className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 w-full max-w-[460px] bg-white">
                                    <div className="h-52 w-full overflow-hidden relative">
                                        <div
                                            className="h-full w-full bg-cover bg-center transition duration-600 ease-in-out hover:scale-110"
                                            style={{
                                                backgroundImage: widget.picture
                                                    ? `url("${process.env.NEXT_PUBLIC_PICTURES}${widget.picture}")`
                                                    : "linear-gradient(to top right, #4c1d95, #0369a1, #22d3ee)",
                                            }}/>
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />
                                        <div className="absolute top-4 left-4 right-4 pointer-events-none">
                                            <h3 className="text-xl font-bold text-white drop-shadow">
                                                {widget.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-white drop-shadow">
                                                {widget.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {Object.values(data).every(
                (group: any) => !group.widgets || group.widgets.length === 0
            ) && <p className="text-slate-700">Keine Widgets verfügbar.</p>}
        </div>
    );
}