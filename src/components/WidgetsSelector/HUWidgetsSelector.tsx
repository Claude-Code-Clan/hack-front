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
import RssWidget from "../../widgets/RssWidget/RssWidget.tsx";

interface HUWidgetSelectorProps {
  type?: WidgetTypes;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function HUWidgetsSelector({type, style}: HUWidgetSelectorProps) {
  switch (type) {
    case 'staticinfo':
      return <StaticInfoWidget style={style}/>

    case 'news':
      return <NewsWidget style={style}/>

    case 'parking':
      return (
        <ParkingWidget style={style}/>
      )

    case 'storage':
      return (
        <StorageWidget style={style}/>
      )

    case 'weather':
      return (
        <WeatherWidget style={style}/>
      )

    case 'rss':
      return (
        <RssWidget style={style}/>
      )

    case 'camera':
      const playerRef = useRef<any>(null);
      return (
        <div className={cls.videoWrapper}>
          <ReactHlsPlayer
            playerRef={playerRef}
            src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
            autoPlay={true}
            controls={false}
            muted={true}
            width="100%"
            height="auto"
            style={{borderRadius: '5px'}}
          />
        </div>
      )

    default:
      return null
  }
}