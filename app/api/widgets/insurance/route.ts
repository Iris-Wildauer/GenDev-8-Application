import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getInsuranceWidgets } from "./insurance";

export async function GET(request: NextRequest){
    const insurance = await getInsuranceWidgets();
    return NextResponse.json({
        insurance
    });

}