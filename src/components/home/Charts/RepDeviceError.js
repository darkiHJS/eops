import React, { useEffect } from 'react';
import styles from './charts01.less'
import F2 from '@antv/f2'
import { WingBlank, List } from 'antd-mobile';

export default function () {
  const data = [
    { genre: '监控', sold: 5 },
    { genre: '办公电脑', sold: 2 },
    { genre: '服务器', sold: 4 },
  ];
  useEffect(() => {
    const chart = new F2.Chart({
      id: 'chart01',
      pixelRatio: window.devicePixelRatio, // 指定分辨率
    });
    chart.source(data)
    chart.interval().position('genre*sold').color('genre')
    chart.render()
  }, [])
  return (
    <div className={styles.chart}>
      <List renderHeader={() => '报修故障总览'}></List>
      <canvas id='chart01' />
    </div>
  )
}