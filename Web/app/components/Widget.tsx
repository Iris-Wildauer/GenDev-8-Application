"use client";

import React, { useEffect, useState } from "react";
import { WidgetInstance } from "../../lib/widgetDefinitions";
import { socket } from "../../socket";
import { useSocketConnection } from "./socketConnection";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import { useSortable, arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";

export default function Widget() {
    const { user } = useSocketConnection();
    const [data, setData] = useState<any | null>(null);
    const [categoryOrder, setCategoryOrder] = useState<string[]>([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_WEBBFF!)
            .then(res => res.json())
            .then(json => {
                setData(json);
                setCategoryOrder(Object.keys(json));
            })
            .catch(() => setData(null));
    }, [user]);

    const sendDnD = async (newOrder: string[]) => {
        if (!user) return;
        return await fetch(process.env.NEXT_PUBLIC_USERS!, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                method: 'setWidgetOrder',
                categoryOrder: newOrder,
                userId: user.id,
                socketId: socket.id
            })
        });
    };

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setCategoryOrder((currentItems) => {
                const oldIndex = currentItems.indexOf(active.id as string);
                const newIndex = currentItems.indexOf(over.id as string);
                const newOrder = arrayMove(currentItems, oldIndex, newIndex);
                sendDnD(newOrder);
                return newOrder;
            });
        }
    }

    function SortableItem({ widgets, category, design }: { widgets: any[], category: string, design: string }) {
        const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: category });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            zIndex: isDragging ? 50 : 'auto',
        };

        return (
            <div ref={setNodeRef} style={style} className={`mb-16 ${isDragging ? "opacity-50" : "opacity-100"}`}>
                <div className="flex items-center gap-4 mb-6 group">
                    <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight leading-none">
                        {category}
                    </h2>
                    <div className="h-[2px] flex-grow bg-slate-100"></div>
                    <div {...attributes} {...listeners} className="cursor-grab p-2 text-slate-300 hover:text-[#004fb6] transition-colors">
                        <GripHorizontal size={24} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {widgets.map((widget: any) => (
                        design === "style1" ? (
                            <div key={widget.id} className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#004fb6] transition-all duration-300">
                                <div className="h-56 overflow-hidden bg-slate-100">
                                    <div
                                        className="h-full w-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                        style={{
                                            backgroundImage: widget.picture
                                                ? `url("${process.env.NEXT_PUBLIC_PICTURES}${widget.picture}")`
                                                : "linear-gradient(135deg, #004fb6 0%, #002e6b 100%)",
                                        }}
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="text-[11px] font-bold text-[#004fb6] uppercase tracking-widest mb-2">ID: {widget.id}</div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#004fb6] transition-colors">
                                        {widget.title}
                                    </h3>
                                    <button className="w-full py-3 bg-[#004fb6] text-white font-bold rounded-lg hover:bg-[#003a8c] transition-colors shadow-md shadow-blue-200">
                                        Details ansehen
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div key={widget.id} className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: widget.picture
                                            ? `url("${process.env.NEXT_PUBLIC_PICTURES}${widget.picture}")`
                                            : "linear-gradient(to bottom right, #004fb6, #60a5fa)",
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <span className="inline-block px-2 py-1 bg-[#004fb6] text-[10px] font-bold text-white rounded mb-3">
                                        {widget.id}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white drop-shadow-md">
                                        {widget.title}
                                    </h3>
                                    <div className="mt-4 h-1 w-0 bg-white group-hover:w-full transition-all duration-500 opacity-70" />
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        );
    }

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
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext items={categoryOrder} strategy={verticalListSortingStrategy}>
                <div className="pb-20">
                    {categoryOrder.map(cat => (
                        <SortableItem key={cat} category={cat} widgets={data[cat]?.widgets || []} design={data[cat]?.design} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}