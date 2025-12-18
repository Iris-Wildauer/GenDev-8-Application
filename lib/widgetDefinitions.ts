export enum WidgetCategory{
    Internet= "Internet",
    Insurance= "Versicherung"
}

export interface WidgetInstance {
    picture?: string;
    id: string,
    title: string,
    category?: WidgetCategory,
    priority?: number
}

export interface WidgetResult {
    category: String,
    data: WidgetInstance[],
    priority?: number
}