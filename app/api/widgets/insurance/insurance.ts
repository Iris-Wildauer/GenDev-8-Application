import type { WidgetInstance} from "../../../../lib/widgets/orchestrator";
//WidgetInstance definition ändern!

export async function getInsuranceWidgets(): Promise<WidgetInstance[]>{
    return [
        {
            id: "insurance.policy_review",
            title: "Versicherungsvertrag überprüfen"
        },
        {
            id:"insurance.claim_assistance",
            title:"Unterstützung bei Schadensfällen"
        },
        {
            id:"insurance.providers_comparison",
            title:"Versicherungsanbieter vergleichen"
        },
    ]
}