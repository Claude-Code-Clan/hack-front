import $api from "./index.ts";
import type {AxiosResponse} from "axios";

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

export const mockBuildings: GetBuildingsResponseI[] = [
  {
    id: 1,
    buildingTitle: 101,
    buildingAddress: "ул. Ленина, 10",
    entrances: [
      {
        id: 11,
        entranceNumber: 1,
        buildingId: 1,
        devices: [
          {id: 111, deviceType: "Холл"},
          {id: 112, deviceType: "Лифтовая кабина"},
          {id: 113, deviceType: "Ресепшен"}
        ]
      },
      {
        id: 12,
        entranceNumber: 2,
        buildingId: 1,
        devices: [
          {id: 121, deviceType: "Холл"},
          {id: 122, deviceType: "Лифтовая кабина"}
        ]
      }
    ]
  },
  {
    id: 2,
    buildingTitle: 202,
    buildingAddress: "пр. Победы, 25",
    entrances: [
      {
        id: 21,
        entranceNumber: 1,
        buildingId: 2,
        devices: [
          {id: 211, deviceType: "Ресепшен"},
          {id: 212, deviceType: "Холл"}
        ]
      },
      {
        id: 22,
        entranceNumber: 2,
        buildingId: 2,
        devices: [
          {id: 221, deviceType: "Лифтовая кабина"},
          {id: 222, deviceType: "Холл"},
          {id: 223, deviceType: "Ресепшен"}
        ]
      },
      {
        id: 23,
        entranceNumber: 3,
        buildingId: 2,
        devices: [
          {id: 231, deviceType: "Холл"}
        ]
      }
    ]
  },
  {
    id: 3,
    buildingTitle: 303,
    buildingAddress: "ул. Советская, 7",
    entrances: [
      {
        id: 31,
        entranceNumber: 1,
        buildingId: 3,
        devices: [
          {id: 311, deviceType: "Ресепшен"},
          {id: 312, deviceType: "Лифтовая кабина"}
        ]
      },
      {
        id: 32,
        entranceNumber: 2,
        buildingId: 3,
        devices: [
          {id: 321, deviceType: "Холл"},
          {id: 322, deviceType: "Холл"}
        ]
      }
    ]
  }
];

export default class BuildingService {
  // private static readonly loginBaseUrl = '/buildings';

  static async getBuildings(): Promise<AxiosResponse<{buildings: GetBuildingsResponseI[]}>> {
    return $api.get('http://87.251.77.84:8080/api/v1/Get/building-list');
  }
}