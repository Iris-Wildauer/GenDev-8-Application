import {WidgetCategory, WidgetInstance} from "../../../../lib/widgetDefinitions";

export async function getInternetWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch(process.env.INTERNET);
    return await res.json();
}

export async function getInsuranceWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch(process.env.INSURANCE);
    return await res.json();
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

export async function getWidgets() {

    const results = await Promise.all(
        WidgetProviders.map(({ provider }) => provider()) //eigentlich selfregistration!
    );

    const widgets: WidgetInstance[] = results.flatMap((result, index) => {
            const { category } = WidgetProviders[index];
            return result.map(widget => ({
                ...widget,
                category,
            }));
    });
    console.log("widgets:" + widgets);
    return widgets;
}