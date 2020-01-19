import React, { useState, useEffect, useCallback } from 'react';
import styles from './index.less'
import { queryOrderList } from '@/request/request'
import { Tabs, WhiteSpace, WingBlank, SearchBar, List } from 'antd-mobile';
import { Drawer, Tag } from 'antd';
import { USER_INFO_ID } from '@/config'
import { local_set, local_get } from '@/utils/index'
import HeaderNormal from '@/components/globel/HeaderNormal'
import OrderTabsItem from '@/components/order/OrderTabsItem'

const { CheckableTag } = Tag;
const tagsFromOrderType = ['工单类型1', '工单类型2', '工单类型3', '工单类型4', '我的待办', '我的参与', '已完成', '逾期',]
// const tagsFromOrder
const user_info = local_get(USER_INFO_ID)
const tabs = [
  { title: '全部', sub: 1, config: [] },
  { title: '待办', sub: 2, config: [{key:"executor",value: user_info.userId, operator:"IN" }, {key:"status",value: "1,2", operator:"IN" }] },
  { title: '参与', sub: 3, config: [{key:"participation",value: user_info.userId, operator:"IN"}] },
  { title: '完成', sub: 4, config: [{key:"status",value: "3", operator:"IN"}] },
  { title: '逾期', sub: 5, config: [{key:"overdue", value: user_info.userId, operator:"IN" }] },
];

const status = ['开始', '未受理', '待审核', '完成', '逾期']

export default function (props) {
  const { location } = props
  const [orderList, setOrderList] = useState([])
  const [count, setCount] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [isYDYMYL, setIsYDYMYL] = useState(false)
  const [isBottom, setIsBottom] = useState(false)

  // 搜索相关
  const [ seachConfig, setSeachConfig ] = useState([])
  const [ searchBarConfig, setSearchBarConfig] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  const loading = useCallback((data) => {
    queryOrderList({
      ...data
    }).then((d) => {
      setCount(d.count)
      if (d.hasOwnProperty('list')) {
        if (d.list.length !== 10) setIsYDYMYL(true)
        setOrderList([...orderList, ...d.list])
      }
    })
      .catch((e) => { })
  })
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags)
  }
  const handleClose = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }
  useEffect(() => {
    // if (location.query.number) {
  
    // } else {
    //   loading({
    //     "model": {},
    //     "pageNum": pageNum,
    //     "pageSize": 10
    //   })
    // }
  }, [])

  useEffect(() => {
    if (isBottom && !isYDYMYL) {
      setPageNum(pageNum + 1)
    }
  }, [isBottom, isYDYMYL, pageNum])

  useEffect(() => {
    if (isBottom) {
      loading({
        "model": {},
        "pageNum": pageNum,
        "pageSize": 10,
        model: {
          attrs: [
            ...seachConfig,
            ...searchBarConfig
          ]
        }
      })
    }
  }, [isBottom, loading, pageNum, seachConfig, searchBarConfig])

  // 监控搜索设置变化
  useEffect(() => {
    loading({
      "pageNum": 1,
      "pageSize": 10,
      model: {
        attrs: [
          ...seachConfig,
          ...searchBarConfig
        ]
      }
    })
  }, [loading, seachConfig, searchBarConfig])

  return (
    <div>
      <HeaderNormal title="工单列表" />
      <Tabs tabs={tabs}
        initialPage={location.query.state}
        onChange={(tab, index) => { }}
        onTabClick={(tab, index) => {
          /// tab切换时
          setPageNum(1)
          setOrderList([])
          setIsYDYMYL(false)
          setSeachConfig(tab.config)
         }}
      />
      <SearchBar
        className={styles.search}
        showCancelButton
        placeholder="请输入工单名称"
        cancelText="筛选"
        onSubmit={value => { 
          setPageNum(1)
          setOrderList([])
          setIsYDYMYL(false)
          if(value === '') setSearchBarConfig([])
          else setSearchBarConfig([{
            key: 'title',
            value: value,
            operator: 'LIKE'
          }])
        }}
        onCancel={() => { setDrawerOpen(true) }}
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
        <List renderHeader={() => '工单类型'} />
        <div className={styles.drawer_open}>
          {tagsFromOrderType.map((tag => (
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
      <div className={styles.tab}
        onScroll={(e) => {
          const { clientHeight, scrollHeight, scrollTop } = e.target
          setIsBottom((clientHeight + scrollTop) + 10 > scrollHeight) // 判断滚动到底部
        }}>
        <WhiteSpace />
        <WingBlank>
          {count ? (<p style={{ textAlign: 'center', opacity: '.4', height: '.4rem', lineHeight: '.4rem' }}>- 查询到{count}条 -</p>) : null}
          {orderList.length <= 0 ?
            <p style={{ color: '#bbb', textAlign: "center" }}>
              没有工单...
              </p> :
            orderList.map((o) => (
              <>
                <OrderTabsItem info={o} state={status[Math.floor(Math.random() * 5)]} />
                <WhiteSpace />
              </>
            ))}
          {isYDYMYL ? (<p style={{ textAlign: 'center', color: '#ccc', paddingBottom: '.2rem' }}>到底了...</p>) : null}
        </WingBlank>
      </div>
    </div>
  )
}