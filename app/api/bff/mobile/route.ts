import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {WidgetCategory} from "../../../../lib/widgetDefinitions";
import { getWidgets } from "../web/webBff"
import { currentUser } from "../user/route"

export async function GET(request: NextRequest){
    const res = await getWidgets();
    const internet = res.filter(w => w.category === WidgetCategory.Internet)
    const insurance =  res.filter(w => w.category === WidgetCategory.Insurance)
    const preferences = currentUser?.preferences ?? { internet: 10, insurance: 10 };

    const widgetGroups = [
        {
            category: WidgetCategory.Internet,
            widgets: internet,
            priority: preferences.internet
        },
        {
            category: WidgetCategory.Insurance,
            widgets: insurance,
            priority: preferences.insurance
        }
    ]
        .filter(group => group.widgets.length > 0)
        .sort((a, b) => b.priority - a.priority);

    const response: Record<string, any> = {};
    widgetGroups.forEach(group => {
        response[group.category] = {
            widgets: group.widgets,
            priority: group.priority
        }
    });

    //Duplicate Code könnt ich in eine Datei packen

    return NextResponse.json(response, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}

export async function OPTIONS(request: NextRequest) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}
