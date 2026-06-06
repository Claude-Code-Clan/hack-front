import { makeAutoObservable, runInAction } from "mobx";

class WeatherStore {
    temperature = null;
    isLoading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchWeather() {
        this.isLoading = true;
        this.error = null;

        try {
            const response = await fetch(
                "https://api.open-meteo.com/v1/forecast?latitude=55.75&longitude=37.61&current=temperature_2m"
            );

            if (!response.ok) {
                throw new Error("Не удалось загрузить данные погоды");
            }

            const data = await response.json();
            //console.log(data.current.temperature_2m.toFixed());

            runInAction(() => {
                this.temperature = data.current.temperature_2m;
                this.isLoading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message;
                this.isLoading = false;
            });
        }
    }
}

export const weatherStore = new WeatherStore();
