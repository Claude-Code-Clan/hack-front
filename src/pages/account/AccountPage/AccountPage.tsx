import { Button, Flex, Input, Modal, Space, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export default function AccountPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [disabled] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleSave() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/account');
    }, 700);
  }

  return (
    <>
      <Flex vertical flex='1' justify='space-between' align='stretch'>
        <div>
          <Typography.Title>Аккаунт</Typography.Title>
          <Space direction='vertical' style={{ padding: '50px 0 10px 0', width: '70%' }}>
            <Input
              disabled={disabled}
              variant='borderless'
              placeholder='Email'
              value='email@gmail.com'
            />
            <Input.Password
              disabled={disabled}
              variant='borderless'
              placeholder='Пароль'
              value='123123123123'
              visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            />
          </Space>
        </div>

        <Space direction='vertical'>
          <Button block type='primary' loading={loading} onClick={handleSave}>
            Сохранить
          </Button>
          <Button
            block
            type='dashed'
            danger
            onClick={() => {
              setIsModalOpen(true);
              // navigate('/login');
            }}
          >
            Выход
          </Button>
          <Button block type='text' onClick={() => navigate('/account')}>
            На главную
          </Button>
        </Space>
      </Flex>

      <Modal
        centered
        title='Подтвердите выход'
        open={isModalOpen}
        onOk={() => navigate('/login')}
        onCancel={() => setIsModalOpen(false)}
        okText='Да'
        cancelText='Отмена'
      >
        <p>Вы действительно хотите выйти?</p>
      </Modal>
    </>
  );
}
