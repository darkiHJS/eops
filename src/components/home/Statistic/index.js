import React, { useState, useEffect } from 'react';
import styles from './index.less';

import { Statistic, Card, Row, Col, Icon } from 'antd';
import { WingBlank, WhiteSpace, Modal } from 'antd-mobile';

import Cards from './Card/index'

export default (props) => {
  const { role } = props
  return (
    <WingBlank>
      <div className={styles.statistic}>
        <Row gutter={8}>
          <Col span={12}>
            <Cards code={role && role[0].code} />
          </Col>
          <Col span={12}>
            <Cards code={role && role[1].code} />
          </Col>
        </Row>
        <WhiteSpace />
        <Row gutter={8}>
          <Col span={12}>
            <Cards code={role && role[2].code} />
          </Col>
          <Col span={12}>
            <Cards code={role && role[3].code} />
          </Col>
        </Row>
      </div>
    </WingBlank>
  )
}