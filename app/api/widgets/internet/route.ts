import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server'
import { getInternetWidgets } from "./internet";

export async function GET(request: NextRequest){
    const internet = await getInternetWidgets();
    console.log("internet:" + internet);
    return NextResponse.json({
        internet
    });
}