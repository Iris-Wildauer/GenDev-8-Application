export enum WidgetCategory {
  Internet = "Internet",
  Insurance = "Versicherung",
  Vacation = "Urlaub",
}

export interface WidgetInstance {
  picture?: string;
  id: string;
  title: string;
  category?: WidgetCategory;
  design?: String;
}

export interface WidgetResult {
  category: String;
  data: WidgetInstance[];
  design: String;
}
