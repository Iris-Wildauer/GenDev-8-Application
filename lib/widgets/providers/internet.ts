import type { WidgetInstance} from "../orchestrator";

export async function getInternetWidgets(): Promise<WidgetInstance[]>{
    return [
        {
            id: "internet.contract_update",
            title: "Internetvertrag optimieren"
        }
    ]
}