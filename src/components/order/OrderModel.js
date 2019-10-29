import React from 'react';
import styles from './OrderModel.less'
import { getOrderModelImg } from '@/utils'

export default function(props) {
  return (
    <div className={styles.model} 
      onClick={() => {
        props.routerTo({
          model_id: props.model.id
        })
      }}>
      <img className={styles.deviceImg} src={getOrderModelImg(props.model.name)}/>
      <h3 className={styles.title}>{props.model.name}</h3>
    </div>
  )
}