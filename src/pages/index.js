import { useState, useEffect, useRef } from 'react'
import { USER_INFO_ID } from '@/config'
import styles from './index.less';

import { router } from 'umi'

import Carousel from '@/components/home/Carousel/index'
import Ribbon from '@/components/home/Ribbon/index'
import Repairs from '@/components/home/Repairs/index'
import Notice from '@/components/home/Notice/index'
import Statistic from '@/components/home/Statistic/index'
import Charts from '@/components/home/Charts/index'

export default function() {
  const [ userIndexState, setUserInodeState ] = useState({})
  const nowIndexState = useRef(userIndexState)
  useEffect(() => {
    if(localStorage[USER_INFO_ID]) {
      setUserInodeState(JSON.parse(localStorage[USER_INFO_ID]))
      nowIndexState.current = JSON.parse(localStorage[USER_INFO_ID])
    }else {
      router.push('/login')
    }
  }, [])
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <Carousel/>
      </div>
      <Ribbon role={userIndexState.role && userIndexState.role.menus.ConvenientMenu}/>
      <Repairs />
      <Notice />
      <Statistic role={userIndexState.role && userIndexState.role.menus.StatisticsView}/>
      <Charts  role={userIndexState.role && userIndexState.role.menus.ReportView}/>
    </div>
  );
}
