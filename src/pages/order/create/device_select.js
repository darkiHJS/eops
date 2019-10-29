import React, { useState, useEffect } from 'react'
import styles from './device_select.less'
import { router } from 'umi'
import { queryDeviceList } from '@/request/request'

import { Icon } from 'antd'
import { WingBlank, WhiteSpace, Toast } from 'antd-mobile'
import { connect } from 'dva'
import { DEVICE_SEARCH } from '@/config'

import HeaderNormal from '@/components/globel/HeaderNormal'
import DeviceItem from '@/components/device/DeviceItem'

const DeviceSelect = (props) => {

  const [showSearch, setShowSearch] = useState(false)
  const [searchType, setSearchType] = useState(0)
  const [devices, setDevices] = useState([])
  const [listIndex, setListIndex] = useState(0)
  const [isBottom, setIsBottom] = useState(false)
  const [isYDYMYL, setIsYDYMYL] = useState(false)

  const routeToTabel = (divice) => {
    props.dispatch({
      type: 'order/setOrder',
      payload: {
        relation_cis: [{
          id: divice.id,
          name: divice.name,
          type: divice.className,
          code: 'resource'
        }]
      }
    })
    props.dispatch({
      type: 'order/setForm',
      payload: {
        resource: [{
          name: divice.name,
          className: divice.className,
          status: 0,
          taskId: null,
          id: divice.id
        }]
      }
    })
    router.push('form')
  }
  // 第一次加载
  const onloadDeviceList = () => {
    queryDeviceList({
      classCode: 'Camera',
      pageNum: listIndex,
      pageSize: 10
    }).then((d) => {
      if(d.dataList.length < 10) setIsYDYMYL(true)
      setDevices([...devices, ...d.dataList])
    })
  }
  useEffect(() => {
    Toast.info('选择要处理的设备。', 1.5)
    onloadDeviceList()
  }, [])

  useEffect(() => {
    onloadDeviceList()
  }, [])

  useEffect(() => {
    if(isBottom && !isYDYMYL) {
      setListIndex(listIndex + 1)
    }
  }, [isBottom])

  useEffect(() => {
    if(isBottom) {
      onloadDeviceList()
    }
  }, [listIndex])

  return (
    <>
      <WingBlank>
        <div className={styles.headerbar}>
          <div className={styles.searchbar}>
            {
              showSearch ?
                <input placeholder={DEVICE_SEARCH('normal')[searchType].prompt} /> :
                '设备 (1057)'
            }
            <button
              onClick={() => { setShowSearch(!showSearch) }}><Icon type="search" /></button>
          </div>
          <div className={styles.addition_item} style={{ display: showSearch ? 'block' : 'none' }}>
            <h3 className={styles.addition_title}>搜索类型: </h3>
            <WingBlank size="md">
              <p className={styles.addition_list}>
                {DEVICE_SEARCH('normal').map((item, i) => {
                  return (
                    <span
                      className={i === searchType ? styles.action : null}
                      onClick={() => { setSearchType(i) }}
                      key={item.name}
                    >{item.name}</span>
                  )
                })}
              </p>
            </WingBlank>
          </div>
        </div>
      </WingBlank>
      <WhiteSpace size="lg" />
      {
        devices.length <= 0 ?
          <p style={{ color: '#bbb', textAlign: "center" }}>
            没有设备...
          </p> :
          <div className={styles.device_list}
            onScroll={(e) => {
              const { clientHeight, scrollHeight, scrollTop } = e.target
              setIsBottom((clientHeight + scrollTop) + 10 > scrollHeight) // 判断滚动到底部
            }}
          >
            {devices.map(e => {
              return (
                <DeviceItem device={e} key={e.id} routerTo={routeToTabel} />
              )
            })}
            { isYDYMYL ? (<p style={{textAlign: 'center', color: '#ccc'}}>到底了...</p>) : null }
          </div>
      }
    </>
  )
}



export default connect(({ order }) => ({ order }))(DeviceSelect)