"use client";

import React, { useEffect, useState } from "react";
import {WidgetInstance, WidgetCategory} from "../../lib/widgetDefinitions";
import{ socket } from "../../socket"
import { useSocketConnection } from "./socketConnection"
import {closestCorners, DndContext, DragEndEvent, useDraggable, useDroppable} from "@dnd-kit/core";
import {useSortable,arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Widget() {
    const { user, isConnected, messages, dataChange } = useSocketConnection();
    const [data, setData] = useState<WidgetInstance[] | null>(null);
    const [categoryOrder, setCategoryOrder] = useState<string[]>([]);



    useEffect(() => {
        console.log("user")
        fetch(process.env.NEXT_PUBLIC_WEBBFF)
            .then(res => res.json())
            .then(json => {
                console.log("Fetched widget data:", json);
                setData(json);
                const categories = Object.keys(json);
                setCategoryOrder(categories);
                console.log( "Data:", json);
                console.log("Categories:", categories);
            })
            .catch(() => setData(null));
    }, [user]);


    const sendDnD = async (newOrder: string[]) => {
        return await fetch(process.env.NEXT_PUBLIC_USERS, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                method: 'setWidgetOrder',
                categoryOrder: newOrder || categoryOrder,
                userId: user.id,
                socketId: socket.id
            })
        })
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (active.id !== over?.id && over) {
            setCategoryOrder((items) => {
                const oldIndex = items.indexOf(active.id as string);
                const newIndex = items.indexOf(over.id as string);
                const newOrder = arrayMove(items, oldIndex, newIndex); //richtig
                sendDnD(newOrder);
                console.log("category order:", newOrder);
                return newOrder;
            });
        }
    }

    function SortableItem({ widgets, category }: { widgets: any[], category: string }) {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition
        } = useSortable({ id: category });


        const style = {
            transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        };


        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing">
                <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white mb-12">
                    <div key={category}>
                        <h2 className="text-xl font-bold text-slate-900 mb-4">
                            {category}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-11">
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
                </div>
            </div>
        );
    }



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
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
            <SortableContext
                items={categoryOrder}
                strategy={verticalListSortingStrategy}>
                <div className="space-y-12">
                    {categoryOrder.map(category => {
                        const group = (data as any)[category];
                        const widgets = group?.widgets;

                        if (!Array.isArray(widgets) || widgets.length === 0) {
                            return null;
                        }

                        return (
                            <SortableItem
                                key={category}
                                widgets={widgets}
                                category={category}
                            />
                        );
                    })}
                    {categoryOrder.every(category => {
                        const group = (data as any)[category];
                        return !group?.widgets || group.widgets.length === 0;
                    }) && (
                        <p className="text-slate-700">Keine Widgets verfügbar.</p>
                    )}
                </div>
            </SortableContext>
        </DndContext>
    );
}