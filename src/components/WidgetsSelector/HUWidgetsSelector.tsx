import cn from "classnames";
import cls from "../WidgetsSelector/HUWidgetsSelector.module.css";
import type {WidgetTypes} from "../../store/widgetsStore.ts";
import NewsWidget from "../../widgets/NewsWidget/NewsWidget.tsx";
import StaticInfoWidget from "../../widgets/StaticInfoWidget/StaticInfoWindget.tsx";
import ParkingWidget from "../../widgets/ParkingWidget/ParkingWidget.tsx";
import StorageWidget from "../../widgets/StorageWidget/StorageWidget.tsx";
import WeatherWidget from "../../widgets/WeatherWidget/WeatherWidget.tsx";
import ReactHlsPlayer from 'react-hls-player';
import {useRef} from "react";

interface HUWidgetSelectorProps {
    type?: WidgetTypes;
    children?: React.ReactNode;
}

export default function HUWidgetsSelector({type, children}: HUWidgetSelectorProps){
    switch (type) {
        case 'staticinfo':
            return <StaticInfoWidget/>

        case 'news':
            return <NewsWidget/>

        case 'parking':
            return (
                <ParkingWidget/>
            )

        case 'storage':
            return (
                <StorageWidget/>
            )

        case 'weather':
            return (
                <WeatherWidget/>
            )

        case 'camera':
            const playerRef = useRef<any>(null);
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <ReactHlsPlayer
                        playerRef={playerRef}
                        src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
                        autoPlay={true}
                        controls={true}
                        muted={true}
                        width="100%"
                        height="auto"
                        style={{borderRadius: '20px'}}
                    />
                </div>
            )

      default:
        return null
    }
}