import cls from './NewsWidget.module.css'
import {Carousel, Typography} from "antd";
import {DateTime} from "luxon";


export interface NewsI {
  title: string;
  body: string;
  date: string;
  liveTime: string
}

function NewsItem({title, body, date}: NewsI) {
  return (
    <div>
      <Typography.Title>{title}</Typography.Title>
      <Typography.Paragraph>{body}</Typography.Paragraph>
      <Typography.Text type="secondary">{DateTime.fromISO(date).toFormat('dd.MM.yyyy')}</Typography.Text>
    </div>
  );
}

export interface NewsWidgetPropsI {
  news: NewsI[];
}

export default function NewsWidget() {
  const news: NewsI[] = [
    {
      title: 'Синицы',
      body: 'Новости нашего двора. Синицы объелись забродившей рябины и гуляют по травке пошатываясь. Если бы синицы могли улыбаться, то они точно бы улыбались',
      date: '2025-12-12',
      liveTime: '1212-12-12',
    },
    {
      title: 'Синицы',
      body: 'Новости нашего двора. Синицы объелись забродившей рябины и гуляют по травке пошатываясь. Если бы синицы могли улыбаться, то они точно бы улыбались',
      date: '2025-12-12',
      liveTime: '1212-12-12',
    },
    {
      title: 'Синицы',
      body: 'Новости нашего двора. Синицы объелись забродившей рябины и гуляют по травке пошатываясь. Если бы синицы могли улыбаться, то они точно бы улыбались',
      date: '2025-12-12',
      liveTime: '1212-12-12',
    },
  ];

  return (
    <div className={cls.wrapper}>
      <Carousel autoplay={{dotDuration: true}} autoplaySpeed={5000}>
        {news.map((newsItem) =>
          (<NewsItem {...newsItem}/>)
        )}
      </Carousel>
    </div>
  );
}