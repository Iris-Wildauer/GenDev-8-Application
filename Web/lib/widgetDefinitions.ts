export enum WidgetCategory{
    Internet= "Internet",
    Insurance= "Versicherung",
    Vacation= "Urlaub"
}

export interface WidgetInstance {
    picture?: string;
    id: string,
    title: string,
    category?: WidgetCategory,
    priority?: number,
    design?: String
}

export interface WidgetResult {
    category: String,
    data: WidgetInstance[],
    priority?: number,
    design: String
}