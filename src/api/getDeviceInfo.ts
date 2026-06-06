import axios, {AxiosResponse} from "axios";

export interface GetDeviceSignalsParamsI {
  apartmentId: string | number;
  eg: string;
}

export interface GetDeviceSignalsResponseI {
  command: string;
  error: number;
  message: string;
  data: GetDeviceSignalsDataI;
  connection: ConnectionInfoI;
  token: string;
  fromdomain: string;
  worktime: string;
}

interface GetDeviceSignalsDataI {
  apartment: ApartmentInfoI;
  signals: SignalsDataI;
}

interface ApartmentInfoI {
  apartment_id: string;
  apartment_title: string;
}

export interface SignalsDataI {
  [serialNumber: string]: SignalItemI[];
}

export interface SignalItemI {
  intensity: number;
  name: string;
  signal_label: string;
}

interface ConnectionInfoI {
  server_real_ip: string;
  user_ip: string;
}

const $apartmentApi = axios.create({baseURL: 'https://api-uae-test.ujin.tech/api/huk/'})

export default class ApartmentService {
  private static readonly hukBaseUrl = 'get-device-signals/';

  static async getApartmentDevices(
    params: GetDeviceSignalsParamsI
  ): Promise<AxiosResponse<GetDeviceSignalsResponseI>> {
    return $apartmentApi.get<GetDeviceSignalsResponseI>(this.hukBaseUrl, {
      params: {
        apartment_id: params.apartmentId,
        eg: params.eg,
        egt: 6,
        token: 'con-10892-057f7948807f893374d5b4c8bdf397d3',
      }
    });
  }
}

