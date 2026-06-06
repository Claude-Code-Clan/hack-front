import cls from './HULoadingBar.module.css';
import { LoadingOutlined } from '@ant-design/icons';

export default function HULoadingBar() {
  return (
    <div className={cls.wrapper}>
      <LoadingOutlined className={cls.icon} size={32} />
    </div>
  );
}
