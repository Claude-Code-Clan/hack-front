import cls from './StaticInfoWidget.module.css'
import {Carousel, Typography} from "antd";

export interface ApartmentsInfoI {
    name: string;
    rules: string;
    trashSchedule: string;
    emergencyContacts: string;
}


function InfoItem({name, rules, trashSchedule, emergencyContacts}: ApartmentsInfoI) {
    return (
        <div>
            <Typography.Title style={{ fontSize: '4rem' }}>{name}</Typography.Title>
            <Typography.Paragraph style={{ fontSize: '1rem' }}>{rules}</Typography.Paragraph>
            <Typography.Paragraph style={{ fontSize: '1rem' }}>{trashSchedule}</Typography.Paragraph>
            <Typography.Text type="warning" style={{ fontSize: '1.25rem' }}>{emergencyContacts}</Typography.Text>
        </div>
    );
}

export interface StaticInfoWidgetPropsI {
    info: ApartmentsInfoI[];
}

export default function StaticInfoWidget() {
    const info: ApartmentsInfoI[] = [
        {
            name: 'Morion',
            rules: '1. Дружить 2. Не шуметь 3. Быть милашками',
            trashSchedule: 'Понедельник, Четверг: 9:00 - 11:00',
            emergencyContacts: '8-800-555-35-35',
        }
    ];

    return (
        <div className={cls.wrapper}>
            <Carousel autoplay={{dotDuration: true}} autoplaySpeed={3000}>
                {info.map((infoItem) =>
                    (<InfoItem {...infoItem}/>)
                )}
            </Carousel>
        </div>
    )
}


