import {NextResponse} from "next/server";
import {getWidgets} from "../../../lib/widgets/orchestrator";

export async function GET(){
    const widget = await getWidgets();

    return NextResponse.json({
        widget
    });
}