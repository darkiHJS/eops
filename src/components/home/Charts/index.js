import React, { useState, useEffect } from 'react';
import styles from './index.less'
import { WingBlank, Tabs } from 'antd-mobile';

import RepDeviceError from './RepDeviceError'
import RepDeviceOnline from './RepDeviceOnline'
import RepTkOverdue from './RepTkOverdue'
import RepTkRepair from './RepTkRepair'

const comp_config = {
  "rep_device_error": () => ( <RepDeviceError/> ),
  "rep_device_online":() => ( <RepDeviceOnline/>),
  "rep_tk_overdue":() => ( <RepTkOverdue/>),
  "rep_tk_repair":() => ( <RepTkRepair/>)
}

export default function (props) {
  const { role } = props
  const [ tabs, setTabs ] = useState([])
  useEffect(() => {
    let arr = []
    if(role && role.length) {
      role.forEach((r) => {
        arr.push({
          title: r.name,
          compKey: r.code
        })
      })
      setTabs(arr)
    }
  }, [role])
  return (
    <div className={styles.chart}>
      <WingBlank>
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          {tabs.length ? tabs.map(t => comp_config[t.compKey]()) : "无数据"}
        </Tabs>
      </WingBlank>
    </div>
  )
}