import { Statistic, Card, Icon } from 'antd';
import styles from './index.less';
import { router } from 'umi'

export default () => {
  return (
    <Card onClick={() => {
      router.push({
        pathname: '/device',
        query: {
          number: 6,
          title: '报废设备'
        }
      })
    }}
    className={styles.statistic_card}>
      <Statistic
        title="设备异常数"
        value={20}
        valueStyle={{ color: '#ffa125' }}
        suffix="/ 180"
      />
      <img src={require('@/assets/home/statistic04.png')} />
    </Card>
  )
}