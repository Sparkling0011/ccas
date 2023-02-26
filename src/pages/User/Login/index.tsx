import Footer from '@/components/Footer';
import { getVerifyCode, login } from '@/services/api';
import storage from '@/utils/storage';
import {
  AlipayCircleOutlined,
  LockOutlined,
  CodeOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Alert, message, Tabs, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './index.less';
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('login');

  const [imageData, SetImageData] = useState<string>('');
  const [vcData, SetVCData] = useState<string>('');

  const { initialState, setInitialState } = useModel('@@initialState');

  const getUserInfo = async () => {
    if (initialState?.fetchUserInfo) {
      const { currentUser, token } = await initialState.fetchUserInfo?.();
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser,
          token,
        }));
      });
    }
  };

  //获取验证码信息
  const resetImageData = async () => {
    const data = await getVerifyCode({});
    const { img, vc } = data.data;
    SetImageData(img);
    SetVCData(vc);
  };

  useEffect(() => {
    async function fetchData() {
      await resetImageData();
    }
    // history.push('/');
    fetchData();
  }, []);

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const { username, password, verifyInput } = values;
      const { code, data } = await login({
        username,
        password,
        verifyInput,
        verifyCode: vcData,
      });
      if (code === 200) {
        const defaultLoginSuccessMessage = '登录成功!';
        message.success(defaultLoginSuccessMessage);
        storage.set('token', data.token);
        storage.set('currentUser', data.user);
        getUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      console.log('error', error);
      const defaultLoginFailureMessage = '登录失败，请重试！';
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { code, type: loginType } = userLoginState;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="教师辅助系统"
          subTitle={'Ant Design 是西湖区最具影响力的 Web 设计规范'}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            '其他登录方式 :',
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={styles.icon} />,
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={styles.icon} />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'login',
                label: '登录',
              },
              {
                key: 'register',
                label: '注册',
              },
            ]}
          />

          {code !== 200 && loginType === 'login' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                width="md"
                placeholder={'用户名: admin or user'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <Row>
                <Col span={15}>
                  <ProFormText
                    name="verifyInput"
                    fieldProps={{
                      size: 'large',
                      prefix: <CodeOutlined className="style.prefix" />,
                    }}
                    placeholder={'验证码'}
                    rules={[
                      {
                        required: true,
                        message: '用户名是必填项！',
                      },
                    ]}
                  />
                </Col>
                <Col span={9}>
                  <img
                    style={{
                      height: '50%',
                      marginLeft: '10px',
                      verticalAlign: 'baseline',
                    }}
                    src={'data:image/jpeg;base64,' + imageData}
                    onClick={() => resetImageData()}
                  />
                </Col>
              </Row>
            </>
          )}

          {code !== 200 && loginType === 'register' && <LoginMessage content="验证码错误" />}
          {type === 'register' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                name="register"
                placeholder={'请输入昵称！'}
                rules={[
                  {
                    required: true,
                    message: '昵称是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                name="password"
                placeholder={'请输入密码！'}
                rules={[
                  {
                    required: true,
                    message: '昵称是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                name="password"
                placeholder={'请再次输入密码！'}
                rules={[
                  {
                    required: true,
                    message: '昵称是必填项！',
                  },
                  {
                    pattern: /^1\d{10}$/,
                    message: '不合法的手机号！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码 ?
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
