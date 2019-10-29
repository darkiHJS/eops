import { useEffect } from 'react'
import styles from './$id.less'
import { WhiteSpace, WingBlank } from 'antd-mobile';
import { Card } from 'antd'
import echarts from 'echarts'
import HeaderNormal from '@/components/globel/HeaderNormal'

const option = {
  title: {
    text: '响应时间',
    subtext: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [{
    type: 'category',
    data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06'],
    axisLine: {
      lineStyle: {
        color: "#999"
      }
    }
  }],
  yAxis: [{
    type: 'value',
    splitNumber: 4,
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#DDD'
      }
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: "#333"
      },
    },
    nameTextStyle: {
      color: "#999"
    },
    splitArea: {
      show: false
    }
  }],
  series: [{
    name: '课时',
    type: 'line',
    data: [23, 60, 20, 36, 23, 85],
    lineStyle: {
      normal: {
        width: 8,
        color: {
          type: 'linear',

          colorStops: [{
            offset: 0,
            color: '#A9F387' // 0% 处的颜色
          }, {
            offset: 1,
            color: '#48D8BF' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        },
        shadowColor: 'rgba(72,216,191, 0.3)',
        shadowBlur: 10,
        shadowOffsetY: 20
      }
    },
    itemStyle: {
      normal: {
        color: '#fff',
        borderWidth: 10,
        /*shadowColor: 'rgba(72,216,191, 0.3)',
        shadowBlur: 100,*/
        borderColor: "#A9F387"
      }
    },
    smooth: true
  }]
};

export default () => {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('mountNode'));
    // 绘制图表
    myChart.setOption(option);
  }, [])
  return (
    <div>
      <HeaderNormal title={'设备性能监控'} />
      <WhiteSpace size="sm"/>
      <WingBlank size="sm">
        <Card
          className={styles.card}
          title="基本信息">
            <img src={require('@/assets/rmon/base.png')}/>
        </Card>
        <WhiteSpace size="sm"/>
        <Card
          className={styles.card}
          title="在线响应" extra={<span>在线率：100% 1天</span>}>
          <div id="mountNode" className={styles.charts} />
        </Card>
        
        <WhiteSpace size="sm"/>
        <Card
          className={styles.card}
          title="端口性能" extra={<span>连接: 10 断开：1</span>}>
            <img src={require('@/assets/rmon/list.jpg')}/>          
        </Card>
      </WingBlank>
    </div>
  )
}