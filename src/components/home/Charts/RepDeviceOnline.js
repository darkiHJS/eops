import React, { useEffect } from 'react';
import styles from './charts01.less'
import F2 from '@antv/f2'
import { WingBlank, List } from 'antd-mobile';

export default function () {
  var map = {
    '在线设备': "99.3%",
    '离线设备': '0.7%'
  };
  var data = [{
    name: '在线设备',
    percent: 0.993,
    a: '1'
  }, {
    name: '离线设备',
    percent: 0.007,
    a: '1'
  }];
  useEffect(() => {
    var chart = new F2.Chart({
      id: 'chart02',
      pixelRatio: window.devicePixelRatio
    });
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.legend({
      position: 'right',
      itemFormatter: function itemFormatter(val) {
        return val + '  ' + map[val];
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });
    chart.axis(false);
    chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    }).animate({
      appear: {
        duration: 1200,
        easing: 'bounceOut'
      }
    });
  
    chart.render();
  }, [])
  return (
    <div className={styles.chart}>
      <List renderHeader={() => '监控设备在线率'}></List>
      <canvas id='chart02' />
    </div>
  )
}