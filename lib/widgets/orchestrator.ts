import {getInternetWidgets} from "./providers/internet"
import {getInsuranceWidgets} from "./providers/insurance"

//Dynamische Discovery von Endpunkten möglich für schnellere Integration
export enum WidgetCategory{
    Internet= "internet",
    Insurance= "insurance"
}

export interface WidgetInstance {
    id: string,
    title: string,
    category: WidgetCategory
}

//Für neue widgets muss man sie einfach hier hinzufügen
   const WidgetProviders = [
       {
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

       return widgets;
   }