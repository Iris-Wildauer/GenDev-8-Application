import type { WidgetInstance} from "../../../../lib/widgets/orchestrator";
//WidgetInstance definition ändern!

export async function getInternetWidgets(): Promise<WidgetInstance[]>{
    return [
        {
            id: "internet.contract_update",
            title: "Internetvertrag optimieren"
        },
        {
            id:"internet.speed_test",
            title:"Internetgeschwindigkeit testen"
        },
        {
            id:"internet.providers_comparison",
            title:"Internetanbieter vergleichen"
        },
    ]
}