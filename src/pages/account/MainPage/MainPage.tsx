import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import {observer} from "mobx-react";
import GridLayoutContainer from "../GridLayoutContainer/GridLayoutContainer.tsx";
import WidgetsStore from "../../../store/widgetsStore.ts";
import {Button, Drawer, Flex, Typography} from "antd";
import {useState} from "react";
import cls from './mainPage.module.css';
import {PlusOutlined} from "@ant-design/icons";
import { WidgetTypes, widgetTypes } from '../../../store/widgetsStore';


const MainPage = observer(() => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const addWidget = (type: WidgetTypes) => {
      console.log("Clicked")
    WidgetsStore.addWidget(type, {
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
        title="Добавить новый виджет"
        closable={{'aria-label': 'Close Button'}}
        onClose={onClose}
        open={open}
      >
          <div>
              {widgetTypes.map((widget) => (
                  <Flex vertical>
                      <Flex align="center" justify="space-between">
                          <Typography.Text>Добавить виджет {widget}</Typography.Text>
                          <Button type='text' key={widget} onClick={() => addWidget(widget)} icon={<PlusOutlined/>}/>
                      </Flex>
                  </Flex>
              ))}
          </div>


      </Drawer>
      <GridLayoutContainer/>
    </div>
  )
})

export default MainPage;