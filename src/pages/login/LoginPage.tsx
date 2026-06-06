import { Button, Flex, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleEnter() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/account');
    }, 700);
  }

  return (
    <Flex vertical align="center" justify="center" flex="1">
      <Space direction="vertical" size="large">
        <Typography.Title style={{ textAlign: 'center' }}>Ujin<br/> Личный кабинет</Typography.Title>

        <Space direction="vertical" style={{width: '100%'}}>
          <Input variant="filled" placeholder="Email" />
          <Input.Password
            variant="filled"
            placeholder="Пароль"
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          />
        </Space>

        <Button block type="primary" loading={loading} onClick={handleEnter}>
          Вход
        </Button>
      </Space>
    </Flex>
  );
}
