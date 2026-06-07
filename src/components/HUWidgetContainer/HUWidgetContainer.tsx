import type {PropsWithChildren} from "react";
import cls from './HUWidgetContainer.module.css';
import {DeleteOutlined, HolderOutlined} from "@ant-design/icons";
import cn from 'classnames';
import {Button, Card} from "antd";

interface HUWidgetContainerPropsI {
  onDelete?: () => void;
}

export default function HUWidgetContainer({children, onDelete}: PropsWithChildren<HUWidgetContainerPropsI>) {
  return (
    <Card
      className={cls.wrapper}
    >
      <div className={cn(cls.dragHolder, 'drag-handle')}>
        <Button
          type='text'
          icon={<HolderOutlined/>}
        />
        {onDelete &&
          (<Button
            onClick={onDelete}
            type='text'
            icon={<DeleteOutlined/>}
          />)
        }
      </div>
      <div style={{height: '100%'}}>
        {children}
      </div>
    </Card>
  );
}