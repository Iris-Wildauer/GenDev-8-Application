import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {getAllUserData, DEFAULT_USER, setUserWidgets} from "./users"
import {getUserWidgetPriorities, invalidateCache, setUserWidgetPriorities} from "../../../../lib/cache";
import {socket} from "../../../../socket";
import {Server} from "socket.io";

export let currentUser = DEFAULT_USER;

export async function GET(request: NextRequest) {
    return NextResponse.json({
        allUsers: getAllUserData(),
        currentUser: currentUser
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log('[POST /user] Received:', body);

    if (body.method === 'setUser') {

        if (body.username || body.socketId) {
            currentUser = body;
            console.log('[POST /user] Updated currentUser to:', currentUser.username);

            if (globalThis.socketIO && body.socketId) {
                globalThis.socketIO.to(body.socketId).emit('user-change', currentUser);
                console.log(`[Socket.io] ${body.socketId}`);
            } else if (globalThis.socketIO) {
                // Fallback: Broadcast wenn keine socketId
                globalThis.socketIO.emit('user-change', currentUser);
                console.log(`[Socket.io] (no socketId)`);
            }

            return NextResponse.json({
                success: true,
                user: currentUser
            }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
        }
    } else if (body.method === 'setWidgetOrder') {

        if (body.method === 'setWidgetOrder') {
            const { categoryOrder, userId, socketId } = body;

            const success: boolean = setUserWidgets(userId, categoryOrder);

            if (success) {
                await invalidateCache(`preferences:${userId}`);
                await invalidateCache(`widgets:${userId}`);

                const io = globalThis.socketIO as Server;
                io.to(`user_${userId}`).emit('widgetOrderUpdated', {
                    widgetOrder: categoryOrder
                });

                return NextResponse.json({success: true});
            }
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }
    }
}