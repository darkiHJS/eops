import React from 'react'
import styles from './RmonItem.less'
import { Icon } from 'antd-mobile'

export default (props) => {
  const {rmondevice, routerTo=() => {}} = props

  const handleClick = () => {
    routerTo(rmondevice)
  }
  return (
    <div 
      className={styles.rmonitem}
      onClick={handleClick}>
      <div className={styles.rmonitem_img}>
        <img src={require(`@/assets/imgs/order/serve.jpg`)} />
      </div>
      <div className={styles.rmonitem_info}>
        <h3>{rmondevice.name}</h3>
        <p>{rmondevice.from}</p>
      </div>
      <Icon className={styles.rmonitem_rightIcon} type="right"/>      
    </div>
  )
}