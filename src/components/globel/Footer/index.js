import React , {useEffect}  from 'react';
import styles from './index.less'
import router from 'umi/router'
import { Icon } from 'antd';

export default function(props) {
  const footerBar = [
    {name: '首页', route: '/', icon: (<Icon style={{ fontSize: '22px' }} type="home" />)},
    {name: '工单', route: '/order', icon: (<Icon style={{ fontSize: '22px' }} type="snippets" />)},
    {name: '资产', route: '/device', icon: (<Icon style={{ fontSize: '22px' }} type="codepen" />)},
    {name: '监控', route: '/rmon', icon: (<Icon style={{ fontSize: '22px' }} type="monitor" />)},
    {name: '个人', route: '/user', icon: (<Icon style={{ fontSize: '22px' }} type="user" />)},    
  ]
  return (
    <footer className={styles.footer}>
      {footerBar.map((val, i) => (
        <div 
          className={[styles.footerBtn , footerBar[i].route === props.pathname ? styles.action : '',].join(' ')}
          onClick={() => {router.push(val.route)}}>
          {val.icon}<br/>{val.name}
        </div>
      ))}
    </footer>
  )
}