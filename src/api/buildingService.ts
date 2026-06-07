import $api from "./index.ts";
import type {AxiosResponse} from "axios";
import type {WidgetTypes} from "../store/widgetsStore.ts";

export interface GetDevicesResponseI {
  id: number;
  deviceType: string; // ТИП (Холл, Лифтовая кабина, ресепшен)
}

export interface GetEntrancesResponseI {
  id: number; // Id падика
  entranceNumber: number; // Номер подъезда
  buildingId: number; // ID дома
  devices: GetDevicesResponseI[]; // Список экранов
}

export interface GetBuildingsResponseI {
  id: number; // ID дома
  buildingTitle: number; // Номер дома
  buildingAddress: string; // Адрес
  entrances: GetEntrancesResponseI[]; // Список подъездов
}

export interface LoadConfigurationToDisplaysRequestI {
  displayIds: number[];
  widgets: {
    type: WidgetTypes;
    x: number;
    y: number;
    w: number;
    h: number;
  }[];
}

export interface GetDisplayConfigurationByIdRequestI {
  devices: {
    deviceId: number;
    widgets: {
      id: number,
      widgetType: WidgetTypes,
      x: number;
      y: number;
      w: number;
      h: number;
    }[]
  }[]
}

export interface GetAlertsResponseI {
  alerts: {
    id: number;
    deviceId: number;
    status: number;
    message: string;
  }[]
}

export default class BuildingService {
  static async getBuildings(): Promise<AxiosResponse<{ buildings: GetBuildingsResponseI[] }>> {
    return $api.get('http://87.251.77.84:8080/api/v1/Get/building-list');
  }

  static async loadConfigurationToDisplays(payload: LoadConfigurationToDisplaysRequestI): Promise<AxiosResponse> {
    return $api.post('http://87.251.77.84:8080/api/v1/Post/display-set', payload);
  }

  static async getDisplayConfigurationById(deviceIds: number[]): Promise<AxiosResponse<GetDisplayConfigurationByIdRequestI>> {
    return $api.post('http://87.251.77.84:8080/api/v1/Get/get-widgets', {deviceIds});
  }

  static async createNewAlert(displayIds: number[], message: string): Promise<AxiosResponse> {
    return $api.post('http://87.251.77.84:8080/api/v1/Post/alert-add', {displayIds, message});
  }

  static async resolveAlerts(deviceIds: number[]): Promise<AxiosResponse> {
    return $api.post('http://87.251.77.84:8080/api/v1/Post/alert-set', {alertIds: deviceIds});
  }

  static async getAlerts(deviceIds: number[]): Promise<AxiosResponse<GetAlertsResponseI>> {
    return $api.post('http://87.251.77.84:8080/api/v1/Get/get-alerts', {deviceIds});
  }
}