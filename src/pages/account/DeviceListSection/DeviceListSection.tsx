import {Button, Divider, Flex, Input, Typography} from "antd";
import {RightOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";
import DevicesStore from "../../../store/devicesStore.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

interface DeviceItemPropsI {
  deviceId: number
  deviceType: string
  buildingAddress: string
  buildingNumber: number
  entranceNumber: number
}

function DeviceItem({deviceId, deviceType, buildingNumber, entranceNumber, buildingAddress}: DeviceItemPropsI) {
  const navigate = useNavigate();

  return (
    <Flex vertical>
      <Flex align='center' justify='space-between'>
        <Flex vertical>
          <Typography.Title level={5}>{deviceType}</Typography.Title>
          <Typography.Text type='secondary'>{buildingAddress} {buildingNumber},
            подъезд {entranceNumber}</Typography.Text>
        </Flex>
        <Button
          onClick={() => navigate(`details?devices=${deviceId}`)}
          type='text'
          icon={<RightOutlined/>}
        />
      </Flex>
      <Divider/>
    </Flex>
  );
}

const DeviceListSection = observer(() => {
  const [searchValue, setSearchValue] = useState('');
  const deviceList = DevicesStore.getDevicesStringList(searchValue);

  useEffect(() => {
    void DevicesStore.fetchDevices();
  }, []);

  return (
    <Flex vertical style={{overflow: 'auto', maxHeight: '100%'}}>
      <Input.Search
        styles={{root: {width: '100%', paddingBottom: '40px'}}}
        placeholder="input search text"
        onChange={(e) => setSearchValue(e.target.value)}
      />

      {deviceList && deviceList.map((device) => (
        <DeviceItem
          key={device.deviceId}
          deviceType={device.deviceType}
          buildingNumber={device.buildingNumber}
          entranceNumber={device.entranceNumber}
          buildingAddress={device.buildingAddress}
          deviceId={device.deviceId}
        />
      ))}
    </Flex>
  );
})

export default DeviceListSection;