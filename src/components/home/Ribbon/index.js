import React, { useState, useEffect } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import IconFont from '@/components/globel/IconFont';
import styles from './index.less';
import { router } from 'umi'


const fb = [
  { name: '待办工单', key: 'gzbx', icon: (<IconFont type="iconweixiujilu" />), path: {pathname: './order' , query: { state: 1, number: 8 }} },
  { name: '参与工单', key: 'gzbx', icon: (<IconFont type="iconcanyu" />), path: {pathname: './order' , query: { state: 2, number: 11 }} },
  { name: '逾期工单', key: 'gzbx', icon: (<IconFont type="iconyiyuqi" />), path: {pathname: './order' , query: { state: 4, number: 3 }} },
  { name: '完成工单', key: 'gzbx', icon: (<IconFont type="iconwancheng" />), path: {pathname: './order' , query: { state: 3, number: 15 }} },
  { name: '故障设备', key: 'gzbx', icon: (<IconFont type="iconguzhang" />), path: {pathname: './device' , query: { state: 3, number: 8, title: '故障设备'}}  },
  { name: '总览报表', key: 'gzbx', icon: (<IconFont type="iconbaobiaobiaoweiguanli" />), path: './tables' }
]

const routerTo = (route) => {
  router.push(route)
}

export default function () {
  const [fButton, setFButton] = useState(fb)
  return (
    <WingBlank>
      <div className={styles.ribbon}>
        <Carousel
          autoplay={false}
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
          dotStyle={{backgroundColor: "#eeeeee"}}
          dotActiveStyle={{backgroundColor: "#002157"}}
        >
          <div className={styles.ribbon_page}>
            {fButton.map((o) => (
              <div className={styles.ribbon_fb}>
                <button onClick={() => { routerTo(o.path) }}>{o.icon}</button>
                <p>{o.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.ribbon_page}>
            {fButton.map((o) => (
              <div className={styles.ribbon_fb}>
                <button onClick={() => { routerTo(o.path) }}>{o.icon}</button>
                <p>{o.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.ribbon_page}>
            {fButton.map((o) => (
              <div className={styles.ribbon_fb}>
                <button onClick={() => { routerTo(o.path) }}>{o.icon}</button>
                <p>{o.name}</p>
              </div>
            ))}
          </div>
          <div className={styles.ribbon_page}>
            {fButton.map((o) => (
              <div className={styles.ribbon_fb}>
                <button onClick={() => { routerTo(o.path) }}>{o.icon}</button>
                <p>{o.name}</p>
              </div>
            ))}
          </div> 
        </Carousel>
      </div>
    </WingBlank>
  )
}