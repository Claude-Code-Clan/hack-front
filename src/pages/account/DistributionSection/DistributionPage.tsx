import {Button, Drawer, Flex, Input, Tree, TreeDataNode, type TreeProps} from "antd";
import DevicesStore from "../../../store/devicesStore.ts";
import {useEffect, useMemo, useState} from "react";
import {observer} from "mobx-react";
import type {Key} from "antd/es/masonry/Masonry";
import {CheckCircleOutlined, ExclamationCircleOutlined, RightOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import BuildingService, {type GetAlertsResponseI} from "../../../api/buildingService.ts";

const DistributionPage = observer(() => {
  const navigate = useNavigate();
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const [dangerDrawerOpen, setDangerDrawerOpen] = useState(false);
  const [dangerMessage, setDangerMessage] = useState('');
  const [dangerIds, setDangerIds] = useState<number[]>([]);
  const [alerts, setAlerts] = useState<GetAlertsResponseI['alerts']>([]);
  const buildings = DevicesStore.buildings;

  const deviceTree = useMemo(() => {
    const tree: TreeDataNode[] = [];
    for (const building of buildings) {
      tree.push({
        title: `Здание ${building.buildingTitle}, ${building.buildingAddress}`,
        key: `building_${building.id}`,
        children: building.entrances.map(entrance => {
          return ({
            title: `Номер подъезда ${entrance.entranceNumber}`,
            key: `entrance_${entrance.id}`,
            children: entrance.devices.map(device => {
              if (dangerIds.includes(device.id)) {
                return ({
                  title: <div>{device.deviceType} <ExclamationCircleOutlined style={{color: 'red'}} /></div>,
                  key: device.id,
                })
              }
              return ({
                title: device.deviceType,
                key: device.id,
              })
            })
          })
        })
      })
    }

    return tree;
  }, [buildings, dangerIds])

  //@ts-ignore
  const onCheck: () => TreeProps['onCheck'] = (checkedKeys: Key[]) => {
    const devicesIds = checkedKeys.filter(key => typeof key === 'number');
    setSelectedDevices(devicesIds);
  };

  function navigateToConfigureScreens() {
    const params = selectedDevices.map(id => `devices=${id}`).join('&');
    navigate(`details?${params}`);
  }

  function cancelAlerts() {
    const alertsIds = alerts.filter(alert => {
      return selectedDevices.includes(alert.deviceId);
    }).map(a => a.id)
    BuildingService.resolveAlerts(alertsIds).then(() => {
      fetchAlerts();
    })
  }

  const onSendDangerMessage = () => {
    void BuildingService.createNewAlert(selectedDevices, dangerMessage);
    setDangerDrawerOpen(false);
    setDangerMessage('');
    fetchAlerts();
  }

  function fetchAlerts() {
    DevicesStore.fetchDevices().then(() => {
      const deviceIds = DevicesStore.getDevicesStringList().map(device => device.deviceId);

      BuildingService.getAlerts(deviceIds).then((resp) => {
        setDangerIds(resp.data.alerts.map(d => d.deviceId));
        setAlerts(resp.data.alerts);
      });
    })
  }

  useEffect(() => {
    fetchAlerts()
  }, []);

  return (
    <Flex justify='space-between'>
      <Tree
        checkable
        onCheck={onCheck}
        treeData={deviceTree}
      />
      <Flex gap={15} vertical>
        <Button
          onClick={navigateToConfigureScreens}
          disabled={selectedDevices.length === 0}
          icon={<RightOutlined/>}
        >
          Сконфигурировать экран
        </Button>

        <Button
          danger
          disabled={selectedDevices.length === 0}
          icon={<ExclamationCircleOutlined/>}
          onClick={() => setDangerDrawerOpen(true)}
        >
          Активировать режим ЧС
        </Button>
        <Button
          variant='outlined'
          disabled={selectedDevices.length === 0}
          icon={<CheckCircleOutlined/>}
          color="cyan"
          onClick={cancelAlerts}
        >
          Отозвать режим ЧС
        </Button>
      </Flex>


      <Drawer
        title="Отправить сообщение. Режим ЧС"
        closable={{'aria-label': 'Close Button'}}
        onClose={() => {
          setDangerMessage('');
          setDangerDrawerOpen(false)
        }}
        open={dangerDrawerOpen}
      >
        <Flex gap={15} vertical>
          <Input.TextArea
            placeholder="Сообщение"
            onChange={(e) => setDangerMessage(e.target.value)}
          />
          <Button
            type='primary'
            onClick={onSendDangerMessage}
          >
            Отправить
          </Button>
        </Flex>
      </Drawer>
    </Flex>
  );
});

export default DistributionPage;