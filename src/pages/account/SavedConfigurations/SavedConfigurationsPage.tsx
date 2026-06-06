import {Button, Divider, Empty, Flex, Typography} from "antd";
import {PlusOutlined, RightOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import WidgetsStore from "../../../store/widgetsStore.ts";
import {observer} from "mobx-react";

interface SavedConfigItemPropsI {
  name: string;
}

function SavedConfigItem({name}: SavedConfigItemPropsI) {
  return (
    <Flex vertical style={{width: '100%'}}>
      <Flex align='center' justify='space-between'>
        <Flex vertical>
          <Typography.Title level={5}>{name}</Typography.Title>
        </Flex>
        <Button
          // onClick={() => navigate(`details?devices=${deviceId}`)}
          type='text'
          icon={<RightOutlined/>}
        />
      </Flex>
      <Divider/>
    </Flex>
  );
}

const SavedConfigurationsPage = observer(() => {
  const navigate = useNavigate();
  const savedConfigs = WidgetsStore.getSavedConfigurations();

  return(
    <Flex vertical align='flex-start' flex='grow' style={{width: '100%', height: '100%'}}>
      <Button onClick={() => navigate('/account/create-config')} icon={<PlusOutlined />} type='primary'>Создать конфигурацию</Button>

      <Flex vertical align='center' justify='center' style={{width: '100%', height: '100%'}}>
        {savedConfigs?.length === 0 ? <Empty/> : (savedConfigs?.map((conf, index) => {
            return <SavedConfigItem key={`${index}_conf`} name={conf.name}/>
          })
        )}
      </Flex>
    </Flex>
  )
})

export default SavedConfigurationsPage;