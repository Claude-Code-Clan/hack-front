import {Button, Flex, Segmented, Space, Switch, Typography} from 'antd';
import {
  ControlOutlined,
  HomeOutlined,
  LoadingOutlined,
  MoonOutlined,
  SunOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Outlet, useLocation, useNavigate} from 'react-router';

import cls from './MainContainer.module.css';
import {useEffect, useState} from 'react';
import {observer} from 'mobx-react';
import ConfigStore from '../../../store/configStore.ts';
import type {SegmentedLabeledOption} from "antd/es/segmented";

const segmentedConfig: SegmentedLabeledOption<string>[] = [
  {
    label: (
      <Space>
        <HomeOutlined/>
        Главная
      </Space>
    ),
    value: '',
    disabled: false,
  },
  {
    label: (
      <Space>
        <ControlOutlined/>
        Выбранное устройство
      </Space>
    ),
    value: 'details',
    disabled: true,
  },
];

function MainContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSelection, setCurrentSelection] = useState<string>(segmentedConfig[0].value);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSelection(
      segmentedConfig.toReversed().find((segment) => location.pathname.includes(segment.value))
        ?.value ?? segmentedConfig[0].value,
    );
  }, [location]);

  useEffect(() => {
    const isLoading = false;
    setIsLoadingGlobal(isLoading);
  }, []);

  return (
    <>
      <Flex justify='space-between' align='center'>
        <Space>
          <Typography.Title>Личный кабинет</Typography.Title>
          {isLoadingGlobal && <LoadingOutlined style={{fontSize: 32}} size={32}/>}
        </Space>

        <Space size='large'>
          <Switch
            onChange={checked => {
              ConfigStore.changeTheme(checked ? 'dark' : 'light');
            }}
            checkedChildren={<MoonOutlined/>}
            unCheckedChildren={<SunOutlined/>}
            checked={ConfigStore.theme === 'dark'}
          />
          <Button
            onClick={() => navigate('settings')}
            type='text'
            icon={<UserOutlined style={{fontSize: 24}}/>}
          />
        </Space>
      </Flex>

      <Segmented<string>
        block
        options={segmentedConfig}
        onChange={(value) => navigate(value)}
        defaultValue={currentSelection}
        value={currentSelection}
      />
      <div className={cls.mainContainer}>
        <Outlet/>
      </div>
    </>
  );
}

export default observer(MainContainer);