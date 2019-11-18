import React, { useState, useEffect } from 'react'
import styles from './index.less'
import { router } from 'umi'
import { queryDeviceList } from '@/request/request'

import { SearchBar, List, Tabs } from 'antd-mobile'
import { Drawer, Tag, } from 'antd';
import HeaderNormal from '@/components/globel/HeaderNormal'
import DeviceItem from '@/components/device/DeviceItem'

const { CheckableTag } = Tag;
const tagsFromDiviceType = ['设备种类1', '设备种类2', '设备种类3', '设备种类4']
const tagsFromDiviceForm = ['旅顺公安所', '大庆公安所', '包头公安所', '上饶派出所', '象山派出所', '五道口派出所']

const tabs = [
  { title: '全部', sub: 1 },
  { title: '维修', sub: 2 },
  { title: '废弃', sub: 3 },
  { title: '备用', sub: 4 },
];

const Device = (props) => {
  const { location } = props

  // 设备相关
  const [devices, setDevices] = useState([])
  const [deviceNum, setDeviceNum] = useState(0)
  const [listIndex, setListIndex] = useState(0)
  const [isBottom, setIsBottom] = useState(false)
  const [isYDYMYL, setIsYDYMYL] = useState(false)

  // 搜索相关
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  // 第一次加载
  const onloadDeviceList = () => {
    queryDeviceList({
      classCode: 'Camera',
      pageNum: listIndex,
      pageSize: location.query.number || 10
    }).then((d) => {
      if (d.dataList) {
        if (d.dataList.length !== 10) setIsYDYMYL(true)
        setDevices([...devices, ...d.dataList])
        setDeviceNum(d.totalRecords)
      }
    })
  }
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags)
  }
  const handleClose = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }
  useEffect(() => {
    onloadDeviceList()
  }, [])

  useEffect(() => {
    if (isBottom && !isYDYMYL) {
      setListIndex(listIndex + 1)
    }
  }, [isBottom])

  useEffect(() => {
    if (isBottom) {
      onloadDeviceList()
    }
  }, [listIndex])

  return (
    <>
      <HeaderNormal title="设备列表" />
      <Tabs tabs={tabs}
        initialPage={location.query.state}
        onChange={(tab, index) => {}}
        onTabClick={(tab, index) => {}}
      />
      <SearchBar
        className={styles.search}
        showCancelButton
        placeholder="请输入设备名称或设备id"
        cancelText="筛选"
        onSubmit={value =>{}}
        onClear={value => {}}
        onFocus={() => {}}
        onBlur={() =>{}}
        onCancel={() => {} }
      />
      <Drawer
        className={styles.drawer}
        placement="right"
        closable={false}
        onClose={() => { setDrawerOpen(false) }}
        visible={drawerOpen}
      >
        <List renderHeader={() => '已选择条件'} />
        <div className={styles.drawer_open}>
          {selectedTags.map((tag => (
            <Tag key={tag} closable={true} onClose={() => handleClose(tag)}>
              {tag}
            </Tag>
          )))}
        </div>
        <List renderHeader={() => '设备搜索类型'} />
        <div className={styles.drawer_open}>
          {tagsFromDiviceType.map((tag => (
            <CheckableTag
              className={styles.drawer_tag}
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          )))}
        </div>
        <List renderHeader={() => '管理单位'} />
        <div className={styles.drawer_open}>
          {tagsFromDiviceForm.map((tag => (
            <CheckableTag
              className={styles.drawer_tag}
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          )))}
        </div>
      </Drawer>
      <div className={styles.search_number}> - 查询到 '{deviceNum}' 条设备信息 -</div>
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
                <DeviceItem device={e} key={e.id} routerTo={() => {
                  router.push('/device/' + e.id)
                }} />
              )
            })}
            {isYDYMYL ? (<p style={{ textAlign: 'center', color: '#ccc' }}>到底了...</p>) : null}
          </div>
      }
    </>
  )
}

export default Device