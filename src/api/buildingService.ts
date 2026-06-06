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

export default class BuildingService {
  static async getBuildings(): Promise<AxiosResponse<{buildings: GetBuildingsResponseI[]}>> {
    return $api.get('http://87.251.77.84:8080/api/v1/Get/building-list');
  }


  static async loadConfigurationToDisplays(payload: LoadConfigurationToDisplaysRequestI): Promise<AxiosResponse> {
    return $api.post('http://87.251.77.84:8080/api/v1/Post/display-set', payload);
  }
}