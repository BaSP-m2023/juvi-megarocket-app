import react from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Actions/AuthActions';

const SuperAdminsForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(login(values, history));
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[
          {
            required: true,
            message: 'Please input your First Name!'
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: 'Please input your Last Name!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" />
      </Form.Item>
      <Form.Item
        name="birthDate"
        rules={[{ required: true, message: 'Please input your Birth Date!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Birth Date" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item name="phone" rules={[{ required: true, message: 'Please input your Phone!' }]}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Phone Number"
        />
      </Form.Item>
      <Form.Item name="branch" rules={[{ required: true, message: 'Please input your Branch!' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Branch" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="cancel-form-button">
          Cancel
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};
