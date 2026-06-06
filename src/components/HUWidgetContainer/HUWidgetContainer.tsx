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
      title={
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
      }
      className={cls.wrapper}
    >
      <p>
        {children}
      </p>
    </Card>
  );
}