import {Flex, Tree, TreeDataNode, type TreeProps} from "antd";
import DevicesStore from "../../../store/devicesStore.ts";
import {useMemo} from "react";
import {observer} from "mobx-react";
import type {Key} from "antd/es/masonry/Masonry";

const DistributionPage = observer(() => {
  const buildings = DevicesStore.buildings;
  const deviceTree = useMemo(() => {
    const tree: TreeDataNode[] = [];
    for (const building of buildings) {
      tree.push({
        title: building.buildingAddress,
        key: `building_${building.id}`,
        children: building.Entrances.map(entrance => {
          return({
            title: `Номер подъезда ${entrance.entranceNumber}`,
            key: `entrance_${entrance.id}`,
            children: entrance.devices.map(device => {
              return({
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
    console.log('onCheck', devicesIds);
  };

  return (
    <Flex>
      <Tree
        checkable
        onCheck={onCheck}
        treeData={deviceTree}
      />
    </Flex>
  );
});

export default DistributionPage;