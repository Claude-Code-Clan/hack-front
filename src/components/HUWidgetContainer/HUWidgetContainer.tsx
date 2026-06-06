import type {PropsWithChildren} from "react";
import cls from './HUWidgetContainer.module.css';
import cn from 'classnames';

export default function HUWidgetContainer({children}: PropsWithChildren){
  return(
    <div className={cn(cls.wrapper, 'drag-handle')}>
      {children}
    </div>
  );
}