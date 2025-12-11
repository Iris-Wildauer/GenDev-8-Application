import {WidgetCategory, WidgetInstance} from "../../../../lib/orchestrator";

export async function getInternetWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch("http://internet:8081/");
    return await res.json();
}

export async function getInsuranceWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch("http://insurance:8080/");
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
        WidgetProviders.map(({ provider }) => provider())
    );

    const widgets: WidgetInstance[] = results.flatMap((result, index) => {
            const { category} = WidgetProviders[index];
            return result.map(widget => ({
                ...widget,
                category,
            }));
    });
    console.log("widgets:" + widgets);
    return widgets;
}