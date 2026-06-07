import { useEffect, useState } from 'react';
import {Carousel, Typography, Spin, Divider} from "antd";
import cls from './RssWidget.module.css';

export interface RssI {
    title: string;
    availableRss: string;
}

function RssItem({ title, availableRss }: RssI) {
    return (
        <div>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Paragraph>{availableRss}</Typography.Paragraph>
            <Divider/>
            <Typography.Text>Источник: "Российская Газета"</Typography.Text>
        </div>
    );
}

export default function RssWidget({style}: {style?: React.CSSProperties;}) {
    const [rss, setRss] = useState<RssI[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const RSS_URL = "https://rg.ru/xml/index.xml";

    useEffect(() => {
        fetch(`${RSS_URL}`)
            .then((response) => response.text())
            .then((str) => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(str, "text/xml");
                const items = xmlDoc.querySelectorAll("item");

                const parsedItems: RssI[] = Array.from(items).map((item) => {
                    const title = item.querySelector("title")?.textContent || "";
                    const description = item.querySelector("description")?.textContent || "";

                    const cleanDescription = description.replace(/<[^>]*>/g, "");

                    return {
                        title: title,
                        availableRss: cleanDescription,
                    };
                });

                setRss(parsedItems);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Ошибка загрузки RSS:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Spin size="large" className={cls.loader} />;
    }

    if (rss.length === 0) {
        return <div>Нет доступных новостей</div>;
    }

    return (
        <div className={cls.wrapper} style={style}>
            <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={5000}>
                {rss.map((rssItem, index) => (
                    <RssItem key={index} {...rssItem} />
                ))}
            </Carousel>
        </div>
    );
}
