import {makeAutoObservable} from "mobx";
import {Layout, LayoutItem} from "react-grid-layout";

class WidgetsStore {
  private _widgetsLayout: LayoutItem[] = [];
  private _widgetsTypes: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get widgetsLayout(): Layout {
    return this._widgetsLayout;
  }

  set widgetsLayout(widgetsLayout: LayoutItem[]) {
    this._widgetsLayout = widgetsLayout;
  }

  get widgetsTypes(): string[] {
    return this._widgetsTypes;
  }

  set widgetsTypes(widgetsTypes: string[]) {
    this._widgetsTypes = widgetsTypes;
  }

  deleteWidget(id: string): void {
    const indexOfWidget = this._widgetsLayout.map((widget) => widget.i).indexOf(id);
    this._widgetsLayout.splice(indexOfWidget, 1);
  }

  addWidget(type: string, position: Omit<LayoutItem, 'i'>): void {
    this._widgetsTypes.push(type);
    const uuid = crypto.randomUUID();
    this._widgetsLayout.push({i: uuid, ...position});
  }
}

export default new WidgetsStore();