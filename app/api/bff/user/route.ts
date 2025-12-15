// app/api/bff/user/route.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {getAllUserData, getAllUsersNames} from "./users"

export let currentUser;

export async function GET(request: NextRequest) {
    return NextResponse.json(getAllUserData(), {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);
    currentUser = body;

    if (globalThis.socketIO) {
        globalThis.socketIO.emit('user-change', currentUser);
    }

    return NextResponse.json({ success: true, user: currentUser }, {
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
