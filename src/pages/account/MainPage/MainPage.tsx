import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import {observer} from "mobx-react";
import GridLayoutContainer, {layouts} from "../GridLayoutContainer/GridLayoutContainer.tsx";
import WidgetsStore from "../../../store/widgetsStore.ts";
import {Button, Drawer} from "antd";
import {useState} from "react";
import cls from './mainPage.module.css';

WidgetsStore.widgetsLayout = layouts;


const MainPage = observer(() => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const addWidget = () => {
    WidgetsStore.addWidget('mock', {
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
})

export default MainPage;