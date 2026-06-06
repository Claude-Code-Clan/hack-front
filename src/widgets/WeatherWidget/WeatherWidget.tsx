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
                    <EnvironmentOutlined />
                    <Typography.Paragraph>{title}</Typography.Paragraph>
                </Flex>
                <Typography.Title>{temperature}</Typography.Title>
            </Flex>
        </div>
    );
});


export default function WeatherWidget() {
    const weatherSections = [
        {
            title: 'Москва',
        }
    ];

    return (
        <div className={cls.wrapper}>
            <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
                {weatherSections.map((item, index) => (
                    <WeatherItem key={index} title={item.title} />
                ))}
            </Carousel>
        </div>
    );
}