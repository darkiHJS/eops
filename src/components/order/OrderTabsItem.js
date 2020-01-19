import styles from './OrderTabsItem.less'
import { router } from 'umi'
import {  WhiteSpace } from 'antd-mobile'
import { formatDate } from '@/utils/index'

export default function(props) {
  let info = props.info
  const routerTo = () => {
    router.push({
      pathname: 'order/page/' + info.ticketId,
      query: {
        actId: info.activityId,
        modelId: info.modelId
      }
    })
  }
  return (
    <div className={styles.item} onClick={routerTo}>
      <h2 className={styles.title}>{info.title + ' - ' +  info.flowNo}</h2>
      <WhiteSpace/>
      <p className={styles.description}>工单描述：{info.formData.ticketDesc || '无工单描述信息'}</p>
      <WhiteSpace/>
      <p className={styles.date}>报修时间： <span>{info.formData.bxsj ? formatDate(new Date(info.formData.bxsj), 'YYYY-MM-DD hh:mm:ss') : ''}</span></p>
      <p className={styles.orderstate}>{props.state || '开始'}</p>
    </div>
  )
}