import {Button, Drawer} from 'antd';

import {observer} from "mobx-react";
import {useState} from "react";
import WidgetsStore from "../../../store/widgetsStore.ts";
import cls from "../MainPage/mainPage.module.css";
import GridLayoutContainer from "../GridLayoutContainer/GridLayoutContainer.tsx";


const DetailsPage = observer(() => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const addWidget = () => {
    WidgetsStore.addWidget('ads', {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    })
  }

  return (
    <div className={cls.wrapper}>
      <Button type="primary" onClick={showDrawer}>
        Добавить виджет
      </Button>
      <Drawer
        title="Basic Drawer"
        closable={{'aria-label': 'Close Button'}}
        onClose={onClose}
        open={open}
      >
        <Button type="primary" onClick={addWidget}>Добавить виджет</Button>
      </Drawer>
      <GridLayoutContainer/>
    </div>
  )
});

export default DetailsPage;
