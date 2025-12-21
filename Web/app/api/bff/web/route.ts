import {NextRequest, NextResponse} from 'next/server'
import {getWidgets} from "./webBff"
import {getCached} from '../../../../lib/cache';
import {getAuthenticatedUser} from "../../../../lib/auth";
import {WidgetCategory} from "../../../../lib/widgetDefinitions";


export async function GET(request: NextRequest){
    const user = await getAuthenticatedUser(request);
    const results =  await getWidgets(user.id)
    console.log("HELLO HI HIER NOCHMAL :)")
    console.log(results)

    const preferences = await getCached(
        `preferences:${user.id}`,
        async () => user.preferences ?? { internet: 10, insurance: 10, vacation: 10 },
        3600
    );
    const widgetGroups = results
        .map(result => ({
            category: result.category,
            widgets: result.data,
            priority:
                result.category === 'Internet'
                    ? preferences.internet
                    : result.category === 'Versicherung'
                        ? preferences.insurance
                        : result.category === 'Urlaub'
                            ? preferences.vacation
                        : 0,
            design: result.design
        }))
        .filter(result => result.priority > 0)
        .sort((a, b) => b.priority - a.priority);

    const response: Record<string, any> = {};

    widgetGroups.forEach(group => {
        response[group.category as string] = {
            widgets: group.widgets,
            priority: group.priority,
            design: group.design
        }
    });
    console.log("die endgültigen widgets")
    console.log(response)
    return NextResponse.json(response);
}