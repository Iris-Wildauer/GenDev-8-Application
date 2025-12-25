import React from "react";
import Widget from "./components/Widget";

export default function Page() {
    return (
        <div className="space-y-4 px-4 md:px-8">
            <h1 className="text-2xl font-semibold text-slate-900">
                Deine Widgets
            </h1>
            <section className="w-full">
                <Widget/>
            </section>
        </div>
    );
}
