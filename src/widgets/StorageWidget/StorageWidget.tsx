import cls from './StorageWidget.module.css';
import {Carousel, Typography} from "antd";


export interface StorageI {
    title: string;
    availableStorage: string;
}

function StorageItem({title, availableStorage}: StorageI) {
    return (
        <div>
            <Typography.Paragraph>{title}</Typography.Paragraph>
            <Typography.Title>{availableStorage}</Typography.Title>
        </div>
    );
}

export interface StorageWidgetPropsI {
    news: StorageI[];
}

export default function StorageWidget() {
    const storage: StorageI[] = [
        {
            title: 'Доступно кладовых',
            availableStorage: '13',
        }
    ];

    return (
        <div className={cls.wrapper}>
            <Carousel autoplay={{dotDuration: true}} autoplaySpeed={5000}>
                {storage.map((storageItem) =>
                    (<StorageItem {...storageItem}/>)
                )}
            </Carousel>
        </div>
    );
}