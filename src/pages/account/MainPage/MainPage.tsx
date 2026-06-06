import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import {observer} from "mobx-react";
import {Flex, Splitter, Typography} from "antd";
import DistributionPage from "../DistributionSection/DistributionPage.tsx";
import DeviceListSection from "../DeviceListSection/DeviceListSection.tsx";

const MainPage = observer(() => {
  return (
    <Splitter>
      <Splitter.Panel resizable={false}>
        <Flex vertical flex={1} style={{padding: '0 10px', maxHeight: '100%'}}>
          <Typography.Title level={4}>
            Выбрать устройство
          </Typography.Title>
          <DeviceListSection/>
        </Flex>
      </Splitter.Panel>
      <Splitter.Panel>
        <Flex vertical style={{padding: '0 10px'}}>
          <Typography.Title level={4}>Рассылка экранов</Typography.Title>
          <DistributionPage/>
        </Flex>
      </Splitter.Panel>
    </Splitter>
  )
})

export default MainPage;