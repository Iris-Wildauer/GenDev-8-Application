//eigentlich nur sinnvoll für die definitionen
export enum WidgetCategory{
    Internet= "internet",
    Insurance= "insurance"
}

//WidgetInstance definition ändern!
export interface WidgetInstance {
    id: string,
    title: string,
    category?: WidgetCategory
}

export type InternetWidgetsResponse = {
    internet: WidgetInstance[];
};

export type InsuranceWidgetsResponse = {
    insurance: WidgetInstance[];
}
/*
export async function getInternetWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch("http://localhost:3000/api/widgets/internet");
    const data = await res.json() as InternetWidgetsResponse;

    console.log("internet:", data);
    return data.internet;
}

export async function getInsuranceWidgets(): Promise<WidgetInstance[]>{
    const res = await fetch("http://localhost:3000/api/widgets/insurance");
    const data = await res.json() as InsuranceWidgetsResponse;

    console.log("internet:", data);
    return data.insurance;
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
 */