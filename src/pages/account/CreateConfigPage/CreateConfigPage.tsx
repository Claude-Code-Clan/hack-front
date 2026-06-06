import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import WidgetsStore, {widgetTypes, WidgetTypes} from "../../../store/widgetsStore.ts";
import cls from "../DetailsPage/DetailsPage.module.css";
import {Button, Divider, Drawer, Flex, Input, Typography} from "antd";
import {DeleteOutlined, PlusOutlined, RightOutlined, SaveOutlined} from "@ant-design/icons";
import GridLayoutContainer from "../GridLayoutContainer/GridLayoutContainer.tsx";
import {useNavigate, useSearchParams} from "react-router";

const CreateConfigPage = observer(() => {
  const [open, setOpen] = useState(false);
  const [openSaveDraver, setOpenSaveDraver] = useState(false);
  const [confName, setConfName] = useState('');
  const [searchParams] = useSearchParams();
  const configIndex = searchParams.get('confId');
  const savedConfigs = WidgetsStore.getSavedConfigurations();
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  function onCloseSaveDriver() {
    setOpenSaveDraver(false);
    setConfName('');
  }

  const addWidget = (type: WidgetTypes) => {
    WidgetsStore.addWidget(type, {
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    })
  }

  const onSaveConfiguration = () => {
    WidgetsStore.saveConfiguration(confName);
    onCloseSaveDriver();
    navigate('/account/configurations');
  }

  useEffect(() => {
    if (!configIndex) return;
    WidgetsStore.loadSavedConfigByIndex(Number(configIndex));
  }, []);


  const onClickSaveConfiguration = () => {
    setOpenSaveDraver(true);
  }

  const onDelete = () => {
    if (!configIndex) return;
    WidgetsStore.deleteSavedConfigByIndex(Number(configIndex));
    navigate('/account/configurations');
  }

  const onSaveExistedConfiguration = (index: number) => {
    WidgetsStore.replaceConfigSaveByIndex(index);
    onCloseSaveDriver();
    navigate('/account/configurations');
  }

  return (
    <div className={cls.wrapper}>
      <Flex gap={15}>
        <Button type="primary" onClick={showDrawer}>
          Добавить виджет
        </Button>
        <Button icon={<SaveOutlined/>} onClick={onClickSaveConfiguration}>
          Сохранить конфигурацию
        </Button>
        {configIndex &&
            <Button color='danger' icon={<DeleteOutlined/>} onClick={onDelete}>
                Удалить конфиг
            </Button>
        }
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

      <Drawer
        title="Сохранить конфигурацию"
        closable={{'aria-label': 'Close Button'}}
        onClose={onCloseSaveDriver}
        open={openSaveDraver}
      >
        <Flex gap={15} vertical>
          <Input onChange={(e) => setConfName(e.target.value)} placeholder="Название конфигурации"/>
          <Button onClick={onSaveConfiguration} type='primary'>Сохранить новую</Button>
          {savedConfigs.length !== 0 && <Typography.Title level={5}>Обновить текущую</Typography.Title>}
          {savedConfigs?.map((conf, index) => {
            return (
              <Flex vertical style={{width: '100%'}}>
                <Flex align='center' justify='space-between'>
                  <Flex vertical>
                    <Typography.Title level={5}>{conf.name}</Typography.Title>
                  </Flex>
                  <Button
                    onClick={() => onSaveExistedConfiguration(index)}
                    type='text'
                    icon={<RightOutlined/>}
                  />
                </Flex>
                <Divider/>
              </Flex>
            )
          })}
        </Flex>
      </Drawer>
      <GridLayoutContainer/>
    </div>
  )
})

export default CreateConfigPage;