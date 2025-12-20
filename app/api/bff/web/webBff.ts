import {WidgetInstance, WidgetResult} from "../../../../lib/widgetDefinitions";
import {getCached} from '../../../../lib/cache';

export async function getInternetWidgets(userId: string): Promise<WidgetResult>{
    return getCached(
        `widgets:internet:${userId}`,
        async () => {
            const res = await fetch(process.env.INTERNET + `?userId=${userId}`);
            return await res.json() as WidgetResult;
        },
        300
    );
}

export async function getInsuranceWidgets(userId: string): Promise<WidgetResult>{
    return getCached(
        `widgets:insurance:${userId}`,
        async () => {
            const res = await fetch(process.env.INSURANCE + `?userId=${userId}`);
            return await res.json() as WidgetResult;
        },
        300
    );
}


//Für neue widgets muss man sie einfach hier hinzufügen
const WidgetProviders = [
    {
        provider: getInternetWidgets
    },
    {
        provider: getInsuranceWidgets
    }
];

export async function getWidgets(userId) {
    return getCached(
        `widgets:all:${userId}`,
        async () => {
                const results: WidgetResult[] = await Promise.all(
                    WidgetProviders.map(p => p.provider(userId))
                );


                console.log("HI HELLO HIER RESULTS")
            console.log(results)
            return results;
        },
        300
    );
}