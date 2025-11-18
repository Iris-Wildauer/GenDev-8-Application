import React from "react";
import Widget from "./components/Widget";

export default function Page() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-slate-900">
                CHECK24 GenDev
            </h1>

            <p className="text-sm text-slate-700">
            </p>

            <section className="grid gap-4 md:grid-cols-5">

                <Widget />

            </section>
        </div>
    );
}
