import styles from './index.less';
import { WingBlank } from 'antd-mobile';
import Carousel from '@/components/home/Carousel/index'
import Ribbon from '@/components/home/Ribbon/index'
import Repairs from '@/components/home/Repairs/index'
import Notice from '@/components/home/Notice/index'
import Statistic from '@/components/home/Statistic/index'
import Charts from '@/components/home/Charts/index'

export default function() {
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <Carousel/>
      </div>
      <Ribbon />
      <Repairs />
      <Notice />
      <Statistic />
      <Charts />
    </div>
  );
}
