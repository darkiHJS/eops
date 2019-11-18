import { Statistic, Card, Icon } from 'antd';
import styles from './index.less';
import { router } from 'umi'

export default () => {
  return (
    <Card onClick={() => {
      // setShowCharts(true); setChartsCode(0) 
      router.push({
        pathname: '/order',
        query: {
          dataKey: 'lingqi',
          state: 1,
          number: 3
        }
      })
    }}
      className={styles.statistic_card}>
      <Statistic
        title="逾期/待办"
        value={6}
        valueStyle={{ color: '#ffa125' }}
        suffix="/ 19"
      />
      <img src={require('@/assets/home/statistic01.png')} />
    </Card>
  )
}