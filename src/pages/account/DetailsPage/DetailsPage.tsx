import {Button, Drawer, Flex, Typography} from 'antd';

import {observer} from "mobx-react";
import {useState} from "react";
import WidgetsStore, {WidgetTypes, widgetTypes} from "../../../store/widgetsStore.ts";
import cls from "../MainPage/mainPage.module.css";
import GridLayoutContainer from "../GridLayoutContainer/GridLayoutContainer.tsx";
import {PlusOutlined} from "@ant-design/icons";


const DetailsPage = observer(() => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const addWidget = (type: WidgetTypes) => {
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
});

export default DetailsPage;
