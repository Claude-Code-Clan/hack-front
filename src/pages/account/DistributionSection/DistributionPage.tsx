import {Button, Divider, Drawer, Flex, Input, Tree, TreeDataNode, type TreeProps, Typography} from "antd";
import DevicesStore from "../../../store/devicesStore.ts";
import {useMemo, useState} from "react";
import {observer} from "mobx-react";
import type {Key} from "antd/es/masonry/Masonry";
import {CheckCircleOutlined, ExclamationCircleOutlined, RightOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const DistributionPage = observer(() => {
  const navigate = useNavigate();
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const [dangerDrawerOpen, setDangerDrawerOpen] = useState(false);
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
  }, [buildings])

  //@ts-ignore
  const onCheck: () => TreeProps['onCheck'] = (checkedKeys: Key[]) => {
    const devicesIds = checkedKeys.filter(key => typeof key === 'number');
    setSelectedDevices(devicesIds);
  };

  function navigateToConfigureScreens() {
    const params = selectedDevices.map(id => `devices=${id}`).join('&');
    navigate(`details?${params}`);
  }

  const onSendDangerMessage = () => {
    setDangerDrawerOpen(false);
  }

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
          icon={<RightOutlined />}
        >
          Сконфигурировать экран
        </Button>

        <Button
          danger
          disabled={selectedDevices.length === 0}
          icon={<ExclamationCircleOutlined />}
          onClick={() => setDangerDrawerOpen(true)}
        >
          Активировать режим ЧС
        </Button>
        <Button
          variant='outlined'
          disabled={selectedDevices.length === 0}
          icon={<CheckCircleOutlined />}
          color="cyan"
        >
          Отозвать режим ЧС
        </Button>
      </Flex>


      <Drawer
        title="Отправить сообщение. Режим ЧС"
        closable={{'aria-label': 'Close Button'}}
        onClose={() => setDangerDrawerOpen(false)}
        open={dangerDrawerOpen}
      >
        <Flex gap={15} vertical>
          <Input.TextArea
            placeholder="Сообщение"
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