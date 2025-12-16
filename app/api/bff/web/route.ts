import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import {WidgetCategory} from "../../../../lib/widgetDefinitions";
import { getWidgets } from "./webBff"
import { currentUser } from "../user/route"
import { getCached } from '../../../../lib/cache';
import {getAuthenticatedUser} from "../../../../lib/auth";


export async function GET(request: NextRequest){
    const user = await getAuthenticatedUser(request);
    const res = await getWidgets(user.id);
    const internet = res.filter(w => w.category === WidgetCategory.Internet)
    const insurance =  res.filter(w => w.category === WidgetCategory.Insurance)
    const preferences = await getCached(
        `preferences:${user.id}`,
        async () => user.preferences ?? { internet: 10, insurance: 10 },
        3600
    );
    const WidgetGroups = [
        { category: WidgetCategory.Internet,
            widgets: internet,
            priority: preferences.internet
        },
        { category: WidgetCategory.Insurance,
            widgets: insurance,
            priority: preferences.insurance
        }
    ]
        .filter(group => group.widgets.length > 0)
        .sort((a, b) => b.priority - a.priority);

    const response: Record<string, any> = {};
    WidgetGroups.forEach(group => {

        response[group.category] = {
            widgets: group.widgets,
            priority: group.priority
        }
    });
    return NextResponse.json(response);
}