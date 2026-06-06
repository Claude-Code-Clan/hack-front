import cls from './AccountContainer.module.css';
import { Outlet } from 'react-router';

export default function AccountContainer() {
  return (
    <div className={cls.wrapper}>
      <Outlet />
    </div>
  );
}
