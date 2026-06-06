import cn from "classnames";
import cls from "../WidgetsSelector/HUWidgetsSelector.module.css";
import type {WidgetTypes} from "../../store/widgetsStore.ts";
import NewsWidget from "../../widgets/NewsWidget/NewsWidget.tsx";
import StaticInfoWidget from "../../widgets/StaticInfoWidget/StaticInfoWindget.tsx";
import ParkingWidget from "../../widgets/ParkingWidget/ParkingWidget.tsx";
import StorageWidget from "../../widgets/StorageWidget/StorageWidget.tsx";

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
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Яндекс Погода</div>
                    </div>
                    {children}
                </div>
            )

        case 'camera':
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Трансляция с камеры</div>
                    </div>
                    {children}
                </div>
            )

        case 'other':
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Другое</div>
                    </div>
                    {children}
                </div>
            )

        case 'ads':
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Реклама</div>
                    </div>
                    {children}
                </div>
            )

      default:
        return null
    }
}