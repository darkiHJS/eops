import { useState, useEffect } from 'react'

import styles from './index.less'
import { List, WingBlank, WhiteSpace } from 'antd-mobile'
import { Statistic, Row, Col, Button } from 'antd';
import { router } from 'umi'
import IconFont from '@/components/globel/IconFont';
import { USER_INFO_ID } from '@/config'

const Item = List.Item;

export default () => {
  const [ userInfo, setUserInfo ] = useState({})
  useEffect(() => {
    if(localStorage[USER_INFO_ID]) {
      setUserInfo(JSON.parse(localStorage[USER_INFO_ID]))
    }
  }, [])
  return (
    <>
      <div className={styles.header}>
        <WhiteSpace />
        <WingBlank>
          <h3 className={styles.username} data-job={userInfo.roleName}>{userInfo.realname || 'unknow'}</h3>
          <p className={styles.corporation}><IconFont type="iconposition" />{"上海尚禾信息技术有限公司"}</p>
        </WingBlank>
      </div>
      <List renderHeader={() => '作业状态'}>
        <WingBlank>
          <Row gutter={16} className={styles.data_info}>
            <Col span={12} onClick={() => { router.push({pathname: './order' , query: { state: 1 }}) }}>
              <Statistic title="我的待办" value={120} />
            </Col>
            <Col span={12} onClick={() => { router.push({pathname: './order' , query: { state: 2, number: 9 }}) }}>
              <Statistic title="我的参与" value={9}/>
            </Col>
          </Row>
        </WingBlank>
      </List>
      <List renderHeader={() => '账户安全'} className="my-list">
        <Item arrow="horizontal" multipleLine onClick={() => { }}>
          <IconFont type="iconicon-test2" /> 修改密码
        </Item>
        <Item arrow="horizontal" multipleLine onClick={() => {
          localStorage.removeItem(USER_INFO_ID)
          router.push('/login')
        }}>
          <IconFont type={'iconqiehuan'} /> 切换用户
        </Item>
      </List>
    </>
  )
}