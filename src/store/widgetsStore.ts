import {makeAutoObservable} from "mobx";
import {LayoutItem} from "react-grid-layout";
import BuildingService, {type LoadConfigurationToDisplaysRequestI} from "../api/buildingService.ts";
import NotificationStore from "./notificationStore.ts";
import ErrorHandler, {ErrorI} from "../utils/errorHandler.ts";

export interface WidgetType {
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


class WidgetsStore {
  private _widgetsLayout: LayoutItem[] = [];
  private _widgetsTypes: WidgetType[] = [];
  private readonly _errorHandler = new ErrorHandler();
  savedScene: {
    widgetsLayout: LayoutItem[];
    widgetsTypes: WidgetType[];
  } = {
    widgetsLayout: [],
    widgetsTypes: [],
  }

  constructor() {
    makeAutoObservable(this);
  }

  get widgetsLayout(): LayoutItem[] {
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

  saveTo3DPreview() {
    this.savedScene.widgetsLayout = this._widgetsLayout;
    this.savedScene.widgetsTypes = this._widgetsTypes;
  }

  async loadWidgetByDisplayId(displayId: number): Promise<void> {
    try {
      NotificationStore.isLoading = true;
      const widgets = await BuildingService.getDisplayConfigurationById([displayId]);
      this._widgetsLayout = widgets.data.devices[0].widgets.map((widget) => {
        const uuid = crypto.randomUUID();
        this._widgetsTypes.push({
          type: widget.widgetType,
          widgetId: uuid
        })

        return {
          i: uuid,
          x: widget.x,
          y: widget.y,
          w: widget.w,
          h: widget.h,
        }
      });

      NotificationStore.isLoading = false;
    } catch (e: unknown) {
      const errorsConfig: ErrorI[] = [{errorText: 'Не удалось загрузить конфигурацию'}];
      this._errorHandler.handleError(e, errorsConfig);
      NotificationStore.isLoading = false;
    }
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
      await BuildingService.loadConfigurationToDisplays({displayIds: data, widgets});
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
    localStorage.setItem(uuid, JSON.stringify({
      name: currentSave?.name,
      types: this._widgetsTypes,
      layout: this._widgetsLayout
    }));
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