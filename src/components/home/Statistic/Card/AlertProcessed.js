import { Statistic, Card, Icon } from 'antd';
import styles from './index.less';
import { router } from 'umi'

export default () => {
  return (
    <Card onClick={() => {
      router.push({
        pathname: '/order',
        query: {
          dataKey: 'yuqi',
          state: 4,
          number: 6
        }
      })
    }}
      className={styles.statistic_card}>
      <Statistic
        title="告警/已处理"
        value={18}
        valueStyle={{ color: '#f00' }}
        suffix="/ 20"
      />
      <img src={require('@/assets/home/statistic02.png')} />
    </Card>
  )
}