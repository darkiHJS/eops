import React from 'react';
import styles from './index.less';
import router from 'umi/router'
import { NavBar, Icon } from 'antd-mobile';

export default function(props) {
  return (
    <>
      <NavBar
        className={styles.header_normal}
        mode="dark"
        leftContent={(<Icon type="left" />)}
        rightContent={props.rightContent || null}
        onLeftClick={() => {
          if(props.route) {
            router.push(props.route)
          } else {
            router.go(-1)
          }
        }}
      >
      {props.title}</NavBar>
      <div className={styles.cushion}/>
    </>  
  )
}