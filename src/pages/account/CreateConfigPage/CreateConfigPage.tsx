import {observer} from "mobx-react";
import {use, useEffect, useState} from "react";
import WidgetsStore, {widgetTypes, WidgetTypes} from "../../../store/widgetsStore.ts";
import cls from "../DetailsPage/DetailsPage.module.css";
import {Button, Drawer, Flex, Typography} from "antd";
import {PlusOutlined, SaveOutlined} from "@ant-design/icons";
import GridLayoutContainer from "../GridLayoutContainer/GridLayoutContainer.tsx";
import {useSearchParams} from "react-router";

const CreateConfigPage = observer(() => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const configIndex = searchParams.get('confId');


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

  useEffect(() => {
    if(!configIndex) return;
    WidgetsStore.loadSavedConfigByIndex(Number(configIndex));
  }, []);


  const saveConfiguration = () => {
    if(!configIndex) return;
    WidgetsStore.replaceConfigSaveByIndex(Number(configIndex))
    console.log(WidgetsStore.getSavedConfigurations())
  }

  return (
    <div className={cls.wrapper}>
      <Flex gap={15}>
        <Button type="primary" onClick={showDrawer}>
          Добавить виджет
        </Button>
        <Button icon={<SaveOutlined />} onClick={saveConfiguration}>
          Сохранить конфигурацию
        </Button>
      </Flex>
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

export default CreateConfigPage;