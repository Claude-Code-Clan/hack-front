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
  buildingNumber: number; // Номер дома
  buildingAddress: string; // Адрес
  Entrances: GetEntrancesResponseI[]; // Список подъездов
}

export const mockBuildings: GetBuildingsResponseI[] = [
  {
    id: 1,
    buildingNumber: 101,
    buildingAddress: "ул. Ленина, 10",
    Entrances: [
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
    buildingNumber: 202,
    buildingAddress: "пр. Победы, 25",
    Entrances: [
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
    buildingNumber: 303,
    buildingAddress: "ул. Советская, 7",
    Entrances: [
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

  static async getBuildings(): Promise<GetBuildingsResponseI[]> {
    return Promise.resolve(mockBuildings);
  }
}