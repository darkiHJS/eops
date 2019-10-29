import React from 'react';
import styles from './index.less'
import { Icon } from 'antd';
import { router } from 'umi'

export default function() {
  return (
    <div className={styles.repairs}>
      <button className={styles.entrance} onClick={() => router.push('/order/create')}>
        <Icon type="plus" />
      </button>
    </div>
  )
}