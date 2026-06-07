import cls from './ParkingWidget.module.css';
import {Carousel, Typography} from "antd";


export interface ParkingI {
    title: string;
    availableParking: string;
}

function ParkingItem({title, availableParking}: ParkingI) {
    return (
        <div>
            <Typography.Paragraph>{title}</Typography.Paragraph>
            <Typography.Title>{availableParking}</Typography.Title>
        </div>
    );
}

export interface ParkingWidgetPropsI {
    style?: React.CSSProperties;
}

export default function ParkingWidget({style}: ParkingWidgetPropsI) {
    const parking: ParkingI[] = [
        {
            title: 'Доступно парковочных мест на подземном паркинге',
            availableParking: '67',
        },
        {
            title: 'Доступно парковочных мест на наземном паркинге',
            availableParking: '17',
        }
    ];

    return (
        <div className={cls.wrapper} style={style}>
            <Carousel autoplay={{dotDuration: true}} autoplaySpeed={5000}>
                {parking.map((parkingItem) =>
                    (<ParkingItem {...parkingItem}/>)
                )}
            </Carousel>
        </div>
    );
}