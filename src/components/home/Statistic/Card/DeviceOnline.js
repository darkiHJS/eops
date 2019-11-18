import { Statistic, Card, Icon } from 'antd';
import styles from './index.less';
import { router } from 'umi'

export default () => {
  return (
    <Card onClick={() => {
      // setShowCharts(true); setChartsCode(1)
      router.push({
        pathname: '/device',
        query: {
          number: 7,
          title: '不在线设备'
        }
      })
    }}
      className={styles.statistic_card}>
      <Statistic
        title="设备在线率"
        value={99.3}
        precision={2}
        valueStyle={{ color: '#3fdaa0' }}
        suffix="%"
      />
      <img src={require('@/assets/home/statistic03.png')} />
    </Card>
  )
}