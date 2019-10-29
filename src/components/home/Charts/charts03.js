import React, { useEffect } from 'react';
import styles from './charts01.less'
import F2 from '@antv/f2'
import { WingBlank, List } from 'antd-mobile';

export default function () {
  var data = [{
    time: '1月',
    tem: 1
  }, {
    time: '2月',
    tem: 2
  }, {
    time: '3月',
    tem: 3
  }, {
    time: '4月',
    tem: 5
  }, {
    time: '5月',
    tem: 6
  }, {
    time: '6月',
    tem: 4
  }, {
    time: '7月',
    tem: 3
  }, {
    time: '8月',
    tem: 3
  }];
  useEffect(() => {
    var chart = new F2.Chart({
      id: 'chart03',
      pixelRatio: window.devicePixelRatio
    });
  
    chart.source(data);
    chart.tooltip({
      showCrosshairs: true
    });
    chart.scale({
      time: {
        range: [0, 1]
      },
      tem: {
        tickCount: 5,
        min: 0
      }
    });
    chart.axis('time', {
      label: function label(text, index, total) {
        var textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });
    chart.area().position('time*tem');
    chart.line().position('time*tem');
    chart.render();
  }, [])
  return (
    <div className={styles.chart}>
      <List renderHeader={() => '月逾期指数'}></List>
      <canvas id='chart03' />
    </div>
  )
}