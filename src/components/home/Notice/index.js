import { useState, useEffect } from 'react'
import styles from './index.less'
import { WingBlank } from 'antd-mobile';
import IconFont from '@/components/globel/IconFont';

export default (props) => {
  const news = [
    { title:'庆祝新中国成立70周年', date: '2019-10-01'},
    { title:'新中国成立70周年 多国政要送祝福', date: '2019-10-01'},
    { title:'《祖国在召唤》第一集《使命》 宣传片', date: '2019-10-01'},
    { title:'探访国庆群众游行彩排', date: '2019-10-01'},
  ]
  const [ showIndex, setShowIndex ] = useState(0)

  useEffect(() => {
    const anime = setInterval(() => {
      if(showIndex+1 === news.length) {
        setShowIndex(0)
      }else {
        setShowIndex(showIndex+1)
      }
    }, 5000);
    return () => {
      clearInterval(anime)
    }
  })

  return (
    <WingBlank>
      <div className={styles.notice_news}>
        {news.map((n, i)=> (
          <p className={styles.news} style={{opacity: i === showIndex ? 1 : 0}} >
            <IconFont className={styles.notice_icon} type="icongonggao"/>
            {n.title}
            <span className={styles.date}>{n.date}</span>
          </p>
        ))}
      </div> 
    </WingBlank>
  )
}