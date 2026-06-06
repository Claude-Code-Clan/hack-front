import cn from "classnames";
import cls from "../WidgetsSelector/HUWidgetsSelector.module.css";


interface HUWidgetSelectorProps {
    type: string;
    children?: React.ReactNode;
}

export default function HUWidgetsSelector({type, children}: HUWidgetSelectorProps){
    switch (type) {
        case 'staticinfo':
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Информация</div>
                    </div>
                    {children}
                </div>
            )

        case 'news':
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Новости</div>
                    </div>
                    {children}
                </div>
            )

        case 'parking':
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Свободных парковочных мест</div>
                    </div>
                    {children}
                </div>
            )

        case 'storage':
            return (
                <div className={cn(cls.wrapper, 'handle')}>
                    <div className={cls.header}>
                        <div>Свободных кладовых</div>
                    </div>
                    {children}
                </div>
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
    }
}