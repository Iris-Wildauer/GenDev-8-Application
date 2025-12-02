import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {WidgetCategory} from "../../../../lib/widgets/orchestrator";
import { getWidgets } from "./webBff"

export async function GET(request: NextRequest){
    const res = await getWidgets();
    console.log("get funktion aufgerufen")
    console.log(res);
    const internet = res.filter(w => w.category === WidgetCategory.Internet)
    const insurance =  res.filter(w => w.category === WidgetCategory.Insurance)
    const widgetGroups = [
        { category: 'internet',
            widgets: internet,
            priority: 10
        },
        { category: 'insurance',
            widgets: insurance,
            priority: 30
        }
    ]
        .sort((a, b) => b.priority - a.priority);

    const response: Record<string, any> = {};
    widgetGroups.forEach(group => {
        response[group.category] = {
            widgets: group.widgets.flat(),
            priority: group.priority
        }
    });

    return NextResponse.json(response);
}