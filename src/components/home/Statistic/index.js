import React, { useState, useEffect } from 'react';

import { router } from 'umi'
import { Statistic, Card, Row, Col, Icon } from 'antd';
import { WingBlank, WhiteSpace, Modal } from 'antd-mobile';
import styles from './index.less';

export default function () {
  // const [showCharts, setShowCharts] = useState(false)
  // const [chartsCode, setChartsCode] = useState(0)
  return (
    <WingBlank>
      <div className={styles.statistic}>
        <Row gutter={8}>
          <Col span={12}>
            <Card onClick={() => {
              // setShowCharts(true); setChartsCode(0) 
              router.push({
                pathname: '/order',
                query: {
                  dataKey: 'lingqi',
                  state: 1,
                  number: 3
                }
              })
            }}
              className={styles.statistic_card}>
              <Statistic
                title="逾期/待办"
                value={6}
                valueStyle={{ color: '#ffa125' }}
                suffix="/ 19"
              />
              <img src={require('@/assets/home/statistic01.png')} />
            </Card>
          </Col>
          <Col span={12}>
            <Card onClick={() => {
              // setShowCharts(true); setChartsCode(2)
              router.push({
                pathname: '/order',
                query: {
                  dataKey: 'yuqi',
                  state: 4,
                  number: 6
                }
              })
            }}
              className={styles.statistic_card}>
              <Statistic
                title="告警/已处理"
                value={18}
                valueStyle={{ color: '#f00' }}
                suffix="/ 20"
              />
              <img src={require('@/assets/home/statistic02.png')} />
            </Card>
          </Col>
        </Row>
        <WhiteSpace />
        <Row gutter={8}>
          <Col span={12}>
            <Card onClick={() => {
              // setShowCharts(true); setChartsCode(1)
              router.push({
                pathname: '/device',
                query: {
                  number: 7,
                  title: '不在线设备'
                }
              })
            }}
              className={styles.statistic_card}>
              <Statistic
                title="设备在线率"
                value={99.3}
                precision={2}
                valueStyle={{ color: '#3fdaa0' }}
                suffix="%"
              />
              <img src={require('@/assets/home/statistic03.png')} />
            </Card>
          </Col>
          <Col span={12}>
            <Card onClick={() => {
              // setShowCharts(true); setChartsCode(1) 
              router.push({
                pathname: '/device',
                query: {
                  number: 6,
                  title: '报废设备'
                }
              })
            }}
            className={styles.statistic_card}>
              <Statistic
                title="设备异常数"
                value={20}
                valueStyle={{ color: '#ffa125' }}
                suffix="/ 180"
              />
              <img src={require('@/assets/home/statistic04.png')} />
            </Card>
          </Col>
        </Row>
      </div>
    </WingBlank>
  )
}