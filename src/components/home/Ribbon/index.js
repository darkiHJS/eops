import React, { useState, useEffect } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import IconFont from '@/components/globel/IconFont';
import styles from './index.less';

import RibbonItem from './RibbonItem'

const base = {
  "MyToDo": { name: '待办工单', icon: (<IconFont type="iconweixiujilu" />), path: { pathname: './order', query: { state: 1, number: 8 } } },
  "MyFlow": { name: '参与工单', icon: (<IconFont type="iconcanyu" />), path: { pathname: './order', query: { state: 2, number: 11 } } },
  "Overdue": { name: '逾期工单', icon: (<IconFont type="iconyiyuqi" />), path: { pathname: './order', query: { state: 4, number: 3 } } },
  "Finish": { name: '完成工单', icon: (<IconFont type="iconwancheng" />), path: { pathname: './order', query: { state: 3, number: 15 } }},
  "FaultyEquipment": { name: '故障设备', icon: (<IconFont type="iconguzhang" />), path: { pathname: './device', query: { state: 3, number: 8, title: '故障设备' } } },
  "Overview": { name: '总览报表', icon: (<IconFont type="iconbaobiaobiaoweiguanli" />), path: './tables' },
  "Alert": { name: '告警列表', icon: (<IconFont type="iconweichuligaojing" />), path: './rmon' }
}


export default function (props) {
  const { role } = props
  const [fButton, setFButton] = useState([[1,2,3,4,5,6]])
  useEffect(() => {
    if(role && role.length) {
      let orders = []
      role.forEach((item, index) => {
        const page = Math.floor(index / 6)
        if(!orders[page]) orders[page] = []
        orders[page].push(item)
      })
      setFButton(orders)
    }
  }, [role])
  
  return (
    <WingBlank>
      <div className={styles.ribbon}>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          dotStyle={{ backgroundColor: "#eeeeee" }}
          dotActiveStyle={{ backgroundColor: "#002157" }}
        >
          {fButton.map((o) => (
            <div className={styles.ribbon_page}>
              {o.map((o) => (
                <RibbonItem itemKey={base[o.code] || {}} />
              ))}
            </div>))
          }
        </Carousel>
      </div>
    </WingBlank>
  )
}