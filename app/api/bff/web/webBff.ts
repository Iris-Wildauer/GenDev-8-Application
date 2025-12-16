import {WidgetCategory, WidgetInstance} from "../../../../lib/widgetDefinitions";
import { getCached } from '../../../../lib/cache';

export async function getInternetWidgets(userId: string): Promise<WidgetInstance[]>{
    return getCached(
        `widgets:internet:${userId}`,
        async () => {
            const res = await fetch(process.env.INTERNET + `?userId=${userId}`);
            return await res.json();
        },
        300
    );
}
export async function getInsuranceWidgets(userId: string): Promise<WidgetInstance[]>{
    return getCached(
        `widgets:insurance:${userId}`,
        async () => {
            const res = await fetch(process.env.INSURANCE + `?userId=${userId}`);
            return await res.json();
        },
        300
    );
}


//Für neue widgets muss man sie einfach hier hinzufügen
const WidgetProviders = [

    {
        provider: getInternetWidgets,
        category: WidgetCategory.Internet,
    },
    {
        provider: getInsuranceWidgets,
        category: WidgetCategory.Insurance,
    }
];

export async function getWidgets(userId) {

    return getCached(
        `widgets:all:${userId}`,
        async () => {
            const results = await Promise.all(
                WidgetProviders.map(({ provider }) => provider(userId))
            );

            const widgets: WidgetInstance[] = results.flatMap((result, index) => {
                const { category } = WidgetProviders[index];
                return result.map(widget => ({
                    ...widget,
                    category,
                }));
            });

            console.log(`[BFF] Fetched ${widgets.length} widgets for ${userId}`);
            return widgets;
        },
        300
    );
}