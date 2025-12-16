import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getAllUserData, DEFAULT_USER } from "./users"

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

export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}