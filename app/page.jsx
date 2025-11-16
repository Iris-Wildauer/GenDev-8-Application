import React from "react";
import FlightWidget from "./components/FlightWidget";

export default function Page() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-slate-900">
                CHECK24 GenDev
            </h1>

            <p className="text-sm text-slate-700">
            </p>

            <section className="grid gap-4 md:grid-cols-2">

                <FlightWidget />

                <div className="rounded-lg bg-white p-4 shadow-sm">
                    <h2 className="text-sm font-semibold text-slate-900">
                        Beispiel-Widget
                    </h2>
                    <p className="mt-1 text-xs text-slate-600">Beispiel Widget</p>
                </div>

            </section>
        </div>
    );
}
