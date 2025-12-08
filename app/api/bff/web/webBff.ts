import {WidgetCategory, WidgetInstance,InternetWidgetsResponse, InsuranceWidgetsResponse} from "../../../../lib/orchestrator";

export async function getInternetWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch("http://localhost:3000/api/widgets/internet");
    const internetData = await res.json() as InternetWidgetsResponse;

    console.log("internet:", internetData);
    return internetData.internet;
}

export async function getInsuranceWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch("http://localhost:3000/api/widgets/insurance");
    const data = await res.json() as InsuranceWidgetsResponse;

    console.log("insurance:", data);
    return data.insurance;
}

//Für neue widgets muss man sie einfach hier hinzufügen
const WidgetProviders = [
    {
        //callback function voll cool
        provider: getInternetWidgets,
        category: WidgetCategory.Internet,
    },
    {
        provider: getInsuranceWidgets,
        category: WidgetCategory.Insurance,
    }
];

export async function getWidgets() {

    const results = await Promise.allSettled(
        WidgetProviders.map(({ provider }) => provider())
    );

    const widgets: WidgetInstance[] = results.flatMap((result, index) => {
        if (result.status === "fulfilled") {
            const { category} = WidgetProviders[index];
            return result.value.map(widget => ({
                ...widget,
                category,
            }));
        }
        return [];
    });
    console.log("widgets:" + widgets);
    return widgets;
}