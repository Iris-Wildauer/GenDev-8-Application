import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {getAllUserData, getAllUsersNames} from "./users"

export let currentUser;

export async function GET(){
    return NextResponse.json(getAllUserData());
}

export async function POST(request){
    const body = await request.json();
    console.log(body)
    currentUser = body;
    return new NextResponse("received request")
}
