import {makeAutoObservable} from "mobx";
import BuildingService, {
  type GetBuildingsResponseI,
  type GetDevicesResponseI,
  type GetEntrancesResponseI
} from "../api/buildingService.ts";
import ErrorHandler, {ErrorI} from "../utils/errorHandler.ts";
import NotificationStore from "./notificationStore.ts";

export interface DeviceStringItem {
  deviceString: string;
  deviceId: number;
  buildingAddress: string;
  buildingNumber: number;
  entranceNumber: number;
  deviceType: string;
  buildingId: number;
  entranceId: number;
}

class DevicesStore {
  private _buildings: GetBuildingsResponseI[] = [];
  private _activeDeviceId: number | null = null;
  private readonly _errorHandler = new ErrorHandler();

  constructor() {
    makeAutoObservable(this);
  }

  get activeDeviceId(): number | null {
    return this._activeDeviceId
  }

  getDeviceInfoById(id: number): DeviceStringItem | undefined {
    return this.getDevicesStringList().find((item) => item.deviceId === id)
  }

  getDevicesStringList(filterString?: string): DeviceStringItem[] {
    const list: DeviceStringItem[] = [];
    for (const building of this._buildings) {
      for (const entrance of building.entrances) {
        for (const device of entrance.devices) {
          list.push({
            deviceString: `${building.buildingTitle}, подъезд ${entrance.entranceNumber}, ${device.deviceType}`,
            deviceId: device.id,
            buildingAddress: building.buildingAddress,
            buildingNumber: building.buildingTitle,
            entranceNumber: entrance.entranceNumber,
            deviceType: device.deviceType,
            buildingId: building.id,
            entranceId: entrance.id
          })
        }
      }
    }
    return list.filter(item => !filterString || item.deviceString.toLowerCase().includes(filterString.toLowerCase()));
  }

  getDevices(buildingId: number, entranceId: number): GetDevicesResponseI[] | undefined {
    return this.getEntrances(buildingId)?.find((e) => e.id === entranceId)?.devices
  }

  getEntrances(buildingId: number): GetEntrancesResponseI[] | undefined {
    return this._buildings.find((b) => b.id === buildingId)?.entrances
  }

  get buildings(): GetBuildingsResponseI[] {
    return this._buildings;
  }

  async fetchDevices() {
    try {
      NotificationStore.isLoading = true;
      const devices = await BuildingService.getBuildings();
      console.log('devices.data', devices.data.buildings)
      this._buildings = devices.data.buildings;
      NotificationStore.isLoading = false;
    } catch (e: unknown) {
      NotificationStore.isLoading = false;
      const errorsConfig: ErrorI[] = [{errorText: 'Неверный логин или пароль', code: 401}];
      this._errorHandler.handleError(e, errorsConfig);
    }
  }
}

export default new DevicesStore();