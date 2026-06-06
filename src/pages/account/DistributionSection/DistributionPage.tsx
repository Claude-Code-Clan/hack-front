import {Button, Flex, Tree, TreeDataNode, type TreeProps} from "antd";
import DevicesStore from "../../../store/devicesStore.ts";
import {useMemo, useState} from "react";
import {observer} from "mobx-react";
import type {Key} from "antd/es/masonry/Masonry";
import {RightOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";

const DistributionPage = observer(() => {
  const navigate = useNavigate();
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);
  const buildings = DevicesStore.buildings;
  const deviceTree = useMemo(() => {
    const tree: TreeDataNode[] = [];
    for (const building of buildings) {
      tree.push({
        title: building.buildingAddress,
        key: `building_${building.id}`,
        children: building.Entrances.map(entrance => {
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

  return (
    <Flex justify='space-between'>
      <Tree
        checkable
        onCheck={onCheck}
        treeData={deviceTree}
      />
      <Button
        onClick={navigateToConfigureScreens}
        disabled={selectedDevices.length === 0}
        icon={<RightOutlined />}
      >
        Сконфигурировать экран
      </Button>
    </Flex>
  );
});

export default DistributionPage;