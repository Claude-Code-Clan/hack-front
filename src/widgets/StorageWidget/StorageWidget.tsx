import cls from './StorageWidget.module.css';
import {Carousel, Flex, Typography} from "antd";


export interface StorageI {
    title: string;
    availableStorage: string;
}

function StorageItem({title, availableStorage}: StorageI) {
    return (
        <div>
            <Flex vertical gap={4}>
                <Typography.Paragraph>{title}</Typography.Paragraph>
                <Typography.Title level={4}>{availableStorage}</Typography.Title>
            </Flex>

        </div>
    );
}

export interface StorageWidgetPropsI {
    style?: React.CSSProperties;
}

export default function StorageWidget({style}: StorageWidgetPropsI) {
    const storage: StorageI[] = [
        {
            title: 'Доступно кладовых',
            availableStorage: '13',
        }
    ];

    return (
        <div className={cls.wrapper} style={style}>
            <Carousel autoplay={{dotDuration: true}} autoplaySpeed={5000}>
                {storage.map((storageItem) =>
                    (<StorageItem {...storageItem}/>)
                )}
            </Carousel>
        </div>
    );
}