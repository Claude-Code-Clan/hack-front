import {Button, Divider, Drawer, Flex, Input, Typography} from 'antd';

import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import WidgetsStore, {WidgetTypes, widgetTypes} from "../../../store/widgetsStore.ts";
import cls from './DetailsPage.module.css';
import GridLayoutContainer from "../GridLayoutContainer/GridLayoutContainer.tsx";
import {CloudUploadOutlined, DownloadOutlined, PlusOutlined, RightOutlined, SaveOutlined} from "@ant-design/icons";
import {useNavigate, useSearchParams} from "react-router";
import DevicesStore from "../../../store/devicesStore.ts";


const DetailsPage = observer(() => {
  const [widgetsFetched, setWidgetsFetched] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSaveDraver, setOpenSaveDraver] = useState(false);
  const [openLoadSavedDraver, setOpenLoadSavedDraver] = useState(false);
  const [confName, setConfName] = useState('');
  const savedConfigs = WidgetsStore.getSavedConfigurations();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const devicesIds = searchParams.getAll('devices').map(Number);

  const currentDevice: string = devicesIds.length === 1 ? (DevicesStore.getDeviceInfoById(devicesIds[0])?.deviceString ?? '') : 'экранов';

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

  const widgetNames: Record<string, string> = {
    staticinfo: "Основная информация",
    news: "Новости",
    parking: "Парковки",
    storage: "Кладовые",
    weather: "Погода",
    camera: "Камеры",
    rss: "RSS",
  };

  const addWidget = (type: WidgetTypes) => {
    let maxY = 0;
    WidgetsStore.widgetsLayout.forEach((widget) => {
      if (widget.y + widget.w > maxY) maxY = widget.y + widget.w;
    })
    WidgetsStore.addWidget(type, {
      x: 0,
      y: maxY,
      w: 1,
      h: 1,
    })
  }

  const onClickSaveConfiguration = () => {
    setOpenSaveDraver(true);
  }

  const onSaveConfiguration = () => {
    WidgetsStore.saveConfiguration(confName);
    onCloseSaveDriver();
    navigate('/account');
  }

  const onSaveExistedConfiguration = (index: number) => {
    WidgetsStore.replaceConfigSaveByIndex(index);
    onCloseSaveDriver();
    navigate('/account');
  }

  const loadSavedConfiguration = (index: number) => {
    WidgetsStore.loadSavedConfigByIndex(index);
    setOpenLoadSavedDraver(false)
  }

  const onCloseLoadSavedDriver = () => {
    setOpenLoadSavedDraver(false);
  }

  const onLoadSavedConfiguration = () => {
    if (devicesIds.length === 0) return;
    void WidgetsStore.loadSavedConfigurationToDisplays(devicesIds).finally(() => {
      navigate('/account');
    });
  }

  useEffect(() => {
  if (devicesIds.length !== 1 || widgetsFetched) return;
    void WidgetsStore.loadWidgetByDisplayId(devicesIds[0]).finally(() => {
      setWidgetsFetched(true)
    });
  }, [devicesIds]);

  return (
    <div className={cls.wrapper}>
      <Typography.Title level={4}>Выберите или создайте конфигурацию для {currentDevice}</Typography.Title>
      <Flex gap={15}>
        <Button type="primary" onClick={showDrawer}>
          Добавить виджет
        </Button>
        <Button icon={<SaveOutlined/>} onClick={onClickSaveConfiguration}>
          Сохранить конфигурацию
        </Button>
        <Button
          icon={<DownloadOutlined/>}
          onClick={() => setOpenLoadSavedDraver(true)}
        >
          Загрузить сохраненную
        </Button>
        {devicesIds.length !== 0 &&<Button
          icon={<CloudUploadOutlined/>}
          onClick={onLoadSavedConfiguration}
        >
          Загрузить на экраны
        </Button>}
      </Flex>
      <Drawer
        title="Добавить новый виджет"
        closable={{'aria-label': 'Close Button'}}
        onClose={onClose}
        open={open}
      >
        <div>
          {widgetTypes.map((widget) => (
            <Flex vertical key={widget}>
              <Flex align="center" justify="space-between">
                <Typography.Text>Добавить виджет {widgetNames[widget]}</Typography.Text>
                <Button type='text' onClick={() => addWidget(widget)} icon={<PlusOutlined/>}/>
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

      <Drawer
        title="Загрузить конфигурацию"
        closable={{'aria-label': 'Close Button'}}
        onClose={onCloseLoadSavedDriver}
        open={openLoadSavedDraver}
      >
        <Flex gap={15} vertical>
          {savedConfigs?.map((conf, index) => {
            return (
              <Flex vertical style={{width: '100%'}}>
                <Flex align='center' justify='space-between'>
                  <Flex vertical>
                    <Typography.Title level={5}>{conf.name}</Typography.Title>
                  </Flex>
                  <Button
                    onClick={() => {
                      loadSavedConfiguration(index)
                    }}
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
});

export default DetailsPage;
