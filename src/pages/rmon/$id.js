import { useEffect } from 'react'
import styles from './$id.less'
import { WhiteSpace, WingBlank, Flex } from 'antd-mobile';
import { Card } from 'antd'
import echarts from 'echarts'
import HeaderNormal from '@/components/globel/HeaderNormal'
import IconFont from '@/components/globel/IconFont';

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
const option2 = {
  backgroundColor: "#fff",
  tooltip: {
  },
  grid: {
    top: '1%',
    left: '-12%',
    right: '1%',
    bottom: '1%',
    containLabel: true,
  },
  xAxis: [{
    show: false,
    type: 'category',
    boundaryGap: false,
    axisLine: { //坐标轴轴线相关设置。数学上的x轴
      show: true,
      lineStyle: {
        color: '#2c6423'
      },
    },
    axisLabel: { //坐标轴刻度标签的相关设置
      textStyle: {
        color: '#72d56a',
        margin: 15,
      },
    },
    axisTick: { show: false, }

  }],
  yAxis: [{
    show: false,
    type: 'value',
    min: 0,
    max: 140,
    splitNumber: 7,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#2c6423'
      }
    },
    axisLine: { show: false, },
    axisLabel: {
      margin: 20,
      textStyle: {
        color: '#72d56a',

      },
    },
    axisTick: { show: false, },
  }],
  series: [{
    name: '异常流量',
    type: 'line',
    smooth: true, //是否平滑曲线显示
    // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
    symbolSize: 0,

    lineStyle: {
      normal: {
        color: "rgb(102,255,51)"   // 线条颜色
      }
    },
    areaStyle: { //区域填充样式
      normal: {
        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(102,255,51, 0.9)' },
          { offset: 0.7, color: 'rgba(102,255,51, 0)' }
        ], false)
      }
    },
    data: [90, 105, 84, 125, 110, 92, 98]
  }]
};
export default () => {
  useEffect(() => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('mountNode'));
    var myChart2 = echarts.init(document.getElementById('mainbar'));
    var myChart3 = echarts.init(document.getElementById('mainbar2'));

    // 绘制图表
    myChart.setOption(option);
    myChart2.setOption(option2);
    myChart3.setOption(option2);
    setTimeout(() => {
      myChart3.setOption({
        series: {
          data: [90, 105, 84, 125, 110, 92, 98].reverse()
        }
      })
    }, 3000);
  }, [])
  return (
    <div>
      <HeaderNormal title={'设备性能监控'} />
      <WhiteSpace size="sm" />
      <WingBlank size="sm">
        <Card
          className={styles.card}
          title="基本信息">
          <div className={styles.deviceInfo}>
            <h3 className={styles.devicename}><IconFont className={styles.icon} type="iconshebei" />192.168.1.1 / 192.168.1.1</h3>
            <p className={styles.deviceitem}>H3C ERHMG2/路由器<span className={styles.state}>在线</span></p>
            <p className={styles.deviceitem}>002Z/ER3260G2/电源<span className={styles.state}>正常</span></p>
          </div>
          <div className={styles.deviceInfo}>
            <h3 className={styles.devicename}><IconFont className={styles.icon} type="iconxintiao" />设备性能</h3>
            <div className={styles.devCharts}>
              <p className={styles.title}>主板CPU</p>
              <div id="mainbar" className={styles.charts_1} />
              <p className={styles.title}>主板RAM</p>
              <div id="mainbar2" className={styles.charts_1} />
            </div>
          </div>
        </Card>
        <WhiteSpace size="sm" />
        <Card
          className={styles.card}
          title="在线响应" extra={<span>在线率：100% 1天</span>}>
          <div id="mountNode" className={styles.charts} />
        </Card>

        <WhiteSpace size="sm" />
        <Card
          className={styles.card}
          title="端口性能" extra={<span>连接: 10 断开：1</span>}>
          <WingBlank className={styles.dlist}>
            <Flex>
              <Flex.Item>端口</Flex.Item>
              <Flex.Item>带宽<br/>(Mbps)</Flex.Item>
              <Flex.Item>入速率<br/>(Mbps)</Flex.Item>
              <Flex.Item>出速率<br/>(Mbps)</Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>WAN1</Flex.Item>
              <Flex.Item>100</Flex.Item>
              <Flex.Item>6.21</Flex.Item>
              <Flex.Item>0.57</Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>WAN2</Flex.Item>
              <Flex.Item>100</Flex.Item>
              <Flex.Item>0</Flex.Item>
              <Flex.Item>0</Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>LAN1</Flex.Item>
              <Flex.Item>0</Flex.Item>
              <Flex.Item>0.15</Flex.Item>
              <Flex.Item>2.15</Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>LAN2</Flex.Item>
              <Flex.Item>0</Flex.Item>
              <Flex.Item>0.00</Flex.Item>
              <Flex.Item>0.00</Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>LAN3</Flex.Item>
              <Flex.Item>0</Flex.Item>
              <Flex.Item>0.38</Flex.Item>
              <Flex.Item>2.38</Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
            <Flex>
              <Flex.Item>LAN4</Flex.Item>
              <Flex.Item>0</Flex.Item>
              <Flex.Item>0.15</Flex.Item>
              <Flex.Item>2.15</Flex.Item>
            </Flex>
            <WhiteSpace size="lg" />
          </WingBlank>
        </Card>
        <WhiteSpace size="lg" />
      </WingBlank>
    </div>
  )
}