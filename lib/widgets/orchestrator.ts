import { getInternetWidgets } from "./providers/internet"

export interface WidgetInstance {
    id: string,
    title: string
}

export async function getWidgets(){
    const [internet] = await Promise.all([
        getInternetWidgets()
    ]);

    const widgets:WidgetInstance[] = [...internet] /*Kopie*/

    return widgets;
}