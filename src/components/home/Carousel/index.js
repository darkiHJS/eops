import React, { useState } from 'react';
import { Carousel, WingBlank } from 'antd-mobile';
import styles from './index.less'

export default function () {
  const [data, setData] = useState([
    require('@/assets/home/carousel01.jpg'),
    require('@/assets/home/carousel02.jpg'),
    require('@/assets/home/carousel03.jpg'),
  ])
  const [imgHeight, setImgHeight] = useState(176)
  return (
    <Carousel
      autoplay={true}
      infinite
      beforeChange={(from, to) => {}}
      afterChange={index => {}}
    >
      {data.map(val => (
        <div className={styles.block}><img src={val} /></div>
      ))}
    </Carousel>
  )
}