import { useState, useEffect } from 'react'
import styles from './index.less'
import { router } from 'umi'
import { connect } from 'dva'
import { WingBlank, Button, Toast } from 'antd-mobile';
import { USER_INFO_ID } from '@/config'
import { local_set, local_get } from '@/utils/index'
import { Icon } from 'antd'
import { login, queryUserInfo } from '@/request/request'


const Login = (props) => {
  const [userName, setUserName] = useState('')
  const [passWord, setPassWord] = useState('')

  return (
    <div className={styles.login}>
      <div className={styles.login_logo}>
        <img src={require('@/assets/home/login_logo.png')} />
      </div>
      <WingBlank size="md">
        <div className={styles.login_view}>
          <div
            className={styles.login_input}
            data-title="优云账号">
            <span><Icon type="user" /></span>
            <input onChange={(v) => {
              setUserName(v.target.value)
            }} />
          </div>
          <div
            className={styles.login_input}
            data-title="优云密码">
            <span><Icon type="lock" /></span>
            <input type="password" onChange={(v) => {
              setPassWord(v.target.value)
            }} />
          </div>
          <p className={styles.login_ts}>
            忘记密码？
          </p>
          <Button
            className={styles.login_btn}
            onClick={() => {
              if (userName == '' || passWord == '') {
                Toast.fail('账户密码不能为空', 1);
                return
              }
              login({ passWord, userName })
                .then(dd => {
                  if (!dd.data) {
                    Toast.fail(dd.message, 1);
                    return
                  }
                  queryUserInfo(dd.data)
                    .then(d => {
                      local_set(USER_INFO_ID, {
                        userId: dd.data.userId,
                        username: d.data.username,
                        apiKey: d.data.apiKeys[0].key
                      })
                      router.push('/')
                    })
                })
            }}>登录</Button>
        </div>
        <p className={styles.version}>
          Vol.0.001 - 上海尚禾技术支持
        </p>
      </WingBlank>
    </div>
  )
}

export default connect(({ user }) => ({ user }))(Login)