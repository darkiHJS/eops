import React, { useEffect } from 'react';
import styles from './charts01.less'
import F2 from '@antv/f2'
import { WingBlank, List } from 'antd-mobile';

export default function () {
  var data = [{
    day: '一月',
    value: 4
  }, {
    day: '二月',
    value: 5
  }, {
    day: '三月',
    value: 6
  }, {
    day: '四月',
    value: 3
  }, {
    day: '五月',
    value: 4
  }, {
    day: '六月',
    value: 6
  }, {
    day: '七月',
    value: 4
  }];
  useEffect(() => {
    var chart = new F2.Chart({
      id: 'chart04',
      pixelRatio: window.devicePixelRatio
    });

    chart.source(data, {
      value: {
        tickCount: 5,
        min: 0
      },
      day: {
        range: [0, 1]
      }
    });
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      onShow: function onShow(ev) {
        var items = ev.items;
        items[0].name = null;
        items[0].value = '$ ' + items[0].value;
      }
    });
    chart.axis('day', {
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
    chart.line().position('day*value');
    chart.point().position('day*value').style({
      stroke: '#fff',
      lineWidth: 1
    });
    chart.render();
  }, [])
  return (
    <div className={styles.chart}>
      <List renderHeader={() => '报修故障总览'}></List>
      <canvas id='chart04' />
    </div>
  )
}