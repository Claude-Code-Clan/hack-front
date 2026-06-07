import {makeAutoObservable} from "mobx";
import {Layout, LayoutItem} from "react-grid-layout";
import BuildingService, {type LoadConfigurationToDisplaysRequestI} from "../api/buildingService.ts";
import NotificationStore from "./notificationStore.ts";
import ErrorHandler, {ErrorI} from "../utils/errorHandler.ts";

interface WidgetType {
  type: WidgetTypes;
  widgetId: string;
}

//export type WidgetTypes = 'staticinfo' | 'news' | 'parking' | 'storage' | 'weather' | 'camera' | 'other' | 'ads'

export const widgetTypes = [
  'staticinfo',
  'news',
  'parking',
  'storage',
  'weather',
  'camera',
  'rss'
] as const;

export type WidgetTypes = typeof widgetTypes[number];

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
  type: 'weather',
  widgetId: 'widget-1',
}];

class WidgetsStore {
  private _widgetsLayout: LayoutItem[] = layouts;
  private _widgetsTypes: WidgetType[] = types;
  private readonly _errorHandler = new ErrorHandler();

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

  async loadSavedConfigurationToDisplays(data: LoadConfigurationToDisplaysRequestI['displayIds']): Promise<void> {
    try {
      NotificationStore.isLoading = true;
      const widgets = this._widgetsLayout.map((layout) => {
        const type = this.getWidgetType(layout.i);
        if (!type) throw new Error('Widget type not found');
        return {
          type,
          x: layout.x,
          y: layout.y,
          w: layout.w,
          h: layout.h,
        }
      })
      await     BuildingService.loadConfigurationToDisplays({displayIds: data, widgets});
      NotificationStore.isLoading = false;
    } catch (e: unknown) {
      NotificationStore.isLoading = false;
      const errorsConfig: ErrorI[] = [{errorText: 'Не удалось сохранить на экраны'}];
      this._errorHandler.handleError(e, errorsConfig);
    }
  }

  clearConfiguration() {
    this._widgetsLayout = [];
    this._widgetsTypes = [];
  }

  getWidgetType(widgetId: string): WidgetTypes | undefined {
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

  loadSavedConfigByIndex(index: number): void {
    const savedConf = this.getSavedConfigurations()?.[index];
    this._widgetsLayout = savedConf?.layout ?? [];
    this._widgetsTypes = savedConf?.types ?? [];
  }

  deleteSavedConfigByIndex(index: number): void {
    const savedConf = this.getSavedConfigurations()?.[index];
    localStorage.removeItem(savedConf.uuid);

  }

  replaceConfigSaveByIndex(index: number) {
    const savedConf = this.getSavedConfigurations()?.[index];
    this.replaceConfigSaveByUuid(savedConf.uuid);
  }

  replaceConfigSaveByUuid(uuid: string): void {
    const currentSave = this.getSavedConfigurations().find((item) => item.uuid === uuid);
    localStorage.setItem(uuid, JSON.stringify({name: currentSave?.name, types: this._widgetsTypes, layout: this._widgetsLayout}));
  }

  getSavedConfigurations(): { uuid: string, types: WidgetType[], layout: LayoutItem[], name: string }[] {
    return Object.entries(localStorage).map(([uuid, value]) => {
      try {
        return {uuid, ...JSON.parse(value)};
      } catch {
        return value;
      }
    }).filter((item) => {
      if (typeof item === 'object') {
        if (item.hasOwnProperty('layout')) {
          return true;
        }
      }
      return false;
    });
  }

  saveConfiguration(configName: string): void {
    const uuid = window.crypto.randomUUID();
    localStorage.setItem(uuid, JSON.stringify({
      types: this._widgetsTypes,
      layout: this._widgetsLayout,
      name: configName
    }));
  }
}

export default new WidgetsStore();