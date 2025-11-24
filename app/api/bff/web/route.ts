import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest){
    const res = await fetch("http://localhost:3000/api/widgets").then(res => res.json());
    return NextResponse.json(
        res
    );
}