import cls from './StorageWidget.module.css';
import {Carousel, Flex, Typography} from "antd";


export interface StorageI {
    title: string;
    availableStorage: string;
}

function StorageItem({title, availableStorage}: StorageI) {
    return (
        <div>
            <Flex vertical gap={1}>
                <Typography.Paragraph style={{ fontSize: '1rem' }}>{title}</Typography.Paragraph>
                <Typography.Title style={{ fontSize: '4rem' }}>{availableStorage}</Typography.Title>
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