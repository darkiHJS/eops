import React, { useEffect } from 'react';
import styles from './index.less'
import { WingBlank, Tabs } from 'antd-mobile';

import Charts01 from '../Charts/charts01'
import Charts02 from '../Charts/charts02'
import Charts03 from '../Charts/charts03'
import Charts04 from '../Charts/charts04'

export default function () {
  const tabs = [
    { title: '故障分布' },
    { title: '监控在线' },
    { title: '逾期指数' },
    { title: '报修指数' },
  ]
  useEffect(() => {

  }, [])
  return (
    <div className={styles.chart}>
      <WingBlank>
        <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <Charts01 />
          <Charts02 />
          <Charts03 />
          <Charts04 />
        </Tabs>
      </WingBlank>
    </div>
  )
}