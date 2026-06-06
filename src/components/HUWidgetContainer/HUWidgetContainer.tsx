import type {PropsWithChildren} from "react";
import cls from './HUWidgetContainer.module.css';
import {HolderOutlined} from "@ant-design/icons";
import cn from 'classnames';
import {Card} from "antd";

export default function HUWidgetContainer({children}: PropsWithChildren) {
  return (
    <Card className={cls.wrapper}>
      <div className={cn(cls.dragHolder, 'drag-handle')}>
        <HolderOutlined/>
      </div>
      <p>
        {children}
      </p>
    </Card>
  );
}