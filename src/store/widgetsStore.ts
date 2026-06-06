import {makeAutoObservable} from "mobx";
import {Layout, LayoutItem} from "react-grid-layout";

interface WidgetType {
  type: WidgetTypes;
  widgetId: string;
}

export type WidgetTypes = 'staticinfo' | 'news' | 'parking' | 'storage' | 'weather' | 'camera' | 'other' | 'ads'

export const layouts = [
  {
    i: "widget-1",
    x: 0,
    y: 0,
    w: 2,
    h: 1,
    isDraggable: true,
    isResizable: true,
  },
];

const types: WidgetType[] = [{
  type: 'news',
  widgetId: 'widget-1',
}];

class WidgetsStore {
  private _widgetsLayout: LayoutItem[] = layouts;
  private _widgetsTypes: WidgetType[] = types;

  constructor() {
    makeAutoObservable(this);
  }

  get widgetsLayout(): Layout {
    return this._widgetsLayout;
  }

  set widgetsLayout(widgetsLayout: LayoutItem[]) {
    this._widgetsLayout = widgetsLayout;
  }

  get widgetsTypes(): WidgetType[] {
    return this._widgetsTypes;
  }

  set widgetsTypes(widgetsTypes: WidgetType[]) {
    this._widgetsTypes = widgetsTypes;
  }

  getWidgetType(widgetId: string): string | undefined {
    return this.widgetsTypes.find((widgetType) => widgetType.widgetId === widgetId)?.type;
  }

  deleteWidget(widgetId: string): void {
    const indexOfWidget = this._widgetsLayout.map((widget) => widget.i).indexOf(widgetId);
    this._widgetsLayout.splice(indexOfWidget, 1);
    this._widgetsTypes = this.widgetsTypes.filter(type => type.widgetId !== widgetId);
  }

  addWidget(type: WidgetTypes, position: Omit<LayoutItem, 'i'>): void {
    const uuid = crypto.randomUUID();
    this._widgetsTypes.push({type, widgetId: uuid});
    this._widgetsLayout.push({i: uuid, ...position});
  }
}

export default new WidgetsStore();