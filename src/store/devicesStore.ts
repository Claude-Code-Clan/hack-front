import {makeAutoObservable} from "mobx";
import BuildingService, {
  type GetBuildingsResponseI,
  type GetDevicesResponseI,
  type GetEntrancesResponseI
} from "../api/buildingService.ts";
import ErrorHandler, {ErrorI} from "../utils/errorHandler.ts";

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

  getDevicesStringList(filterString?: string): DeviceStringItem[] {
    const list: DeviceStringItem[] = [];
    for (const building of this._buildings) {
      for (const entrance of building.Entrances) {
        for (const device of entrance.devices) {
          list.push({
            deviceString: `${building.buildingAddress} ${building.buildingNumber}, подъезд ${entrance.entranceNumber}, ${device.deviceType}`,
            deviceId: device.id,
            buildingAddress: building.buildingAddress,
            buildingNumber: building.buildingNumber,
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
    return this._buildings.find((b) => b.id === buildingId)?.Entrances
  }

  get buildings(): GetBuildingsResponseI[] {
    return this._buildings;
  }

  async fetchDevices() {
    try {
      const devices = await BuildingService.getBuildings();
      this._buildings = devices;
    } catch (e: unknown) {
      const errorsConfig: ErrorI[] = [{errorText: 'Неверный логин или пароль', code: 401}];
      this._errorHandler.handleError(e, errorsConfig);
    }
  }
}

export default new DevicesStore();