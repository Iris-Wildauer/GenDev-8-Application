import {getInsuranceWidgets} from "../../app/api/widgets/insurance/insurance"

//Dynamische Discovery von Endpunkten möglich für schnellere Integration
export enum WidgetCategory{
    Internet= "internet",
    Insurance= "insurance"
}

//WidgetInstance definition ändern!
export interface WidgetInstance {
    id: string,
    title: string,
    category: WidgetCategory
}

type InternetWidgetsResponse = {
    internet: WidgetInstance[];
};

export async function getInternetWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch("http://localhost:3000/api/widgets/internet");
    const data = await res.json() as InternetWidgetsResponse;

    console.log("internet:", data); // NICHT mit + verketten!
    return data.internet;
}

//Für neue widgets muss man sie einfach hier hinzufügen
   const WidgetProviders = [
       {
           //callback function voll cool
           provider: getInternetWidgets,
           category: WidgetCategory.Internet
       },
       {
           provider: getInsuranceWidgets,
           category: WidgetCategory.Insurance
       }
   ];

   export async function getWidgets() {
       const results = await Promise.allSettled(
           WidgetProviders.map(({ provider }) => provider())
       );

       const widgets: WidgetInstance[] = results.flatMap((result, index) => {
           if (result.status === "fulfilled") {
               const { category } = WidgetProviders[index];
               return result.value.map(widget => ({
                   ...widget,
                   category
               }));
           }
           return [];
       });

       console.log(widgets);
       return widgets;
   }