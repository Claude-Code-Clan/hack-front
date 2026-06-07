import cls from './WeatherWidget.module.css';
import {Carousel, Flex, Typography} from "antd";
import {weatherStore} from "../../store/weatherStore.ts";
import {useEffect} from "react";
import {observer} from "mobx-react";
import {EnvironmentOutlined} from "@ant-design/icons";


export interface WeatherItemProps {
    title: string;
}

const WeatherItem = observer(({ title }: WeatherItemProps) => {

    useEffect(() => {
        weatherStore.fetchWeather();
    }, []);

    const temperature = weatherStore.temperature || '-';

    return (
        <div>
            <Flex vertical>
                <Flex align='flex-start' justify="space-between">
                    <EnvironmentOutlined style={{ fontSize: '1rem' }} />
                    <Typography.Paragraph style={{ fontSize: '1rem' }}>{title}</Typography.Paragraph>
                </Flex>
                <Typography.Title style={{ fontSize: '4rem' }}>{parseFloat(temperature).toFixed() + "°"}</Typography.Title>
            </Flex>
        </div>
    );
});


export default function WeatherWidget({style}: {style?: React.CSSProperties;}) {
    const weatherSections = [
        {
            title: 'Москва',
        }
    ];

    return (
        <div style={style} className={cls.wrapper}>
            <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
                {weatherSections.map((item, index) => (
                    <WeatherItem key={index} title={item.title} />
                ))}
            </Carousel>
        </div>
    );
}