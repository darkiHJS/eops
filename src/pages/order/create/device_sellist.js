import React, { useState, useEffect, useLayoutEffect } from 'react'
import HeaderNormal from '@/components/globel/HeaderNormal'
import { connect } from 'dva'
import InfiniteScroll from 'react-infinite-scroller'
import router from 'umi/router'
import { queryDeviceByClassCode, queryDeviceList } from '@/request/request'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { Select, Col, Row, Input, Typography, List, Button } from 'antd'

import styles from './device_sellist.less'

const { Search } = Input;
const { Paragraph } = Typography;
const { Option } = Select;

const DeviceSellist = (props) => {
  const [code, setCode] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [deviceClass, setDeviceClass] = useState([])
  const [showDeviceClass, setShowDeviceClass] = useState([])
  const [deviceList, setDeviceList] = useState([])
  const [selectedList, setSelectedList] = useState([])

  // 列表状态
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [pageNum, setPageNum] = useState(0)

  useLayoutEffect(() => {
    onLoadDeviceByClassCode()
  }, [])
  useLayoutEffect(() => {
    let conditions = []
    if (code !== '') {
      conditions.push({
        field: 'classCode',
        value: code,
        operator: "EQ"
      })
    }
    if (searchKey !== '') {
      conditions.push({
        field: 'name',
        value: searchKey,
        operator: "LIKE"
      })
    }
    onLoadDeviceList({
      pageNum: pageNum,
      pageSize: 10,
      conditions: conditions
    })
  }, [code, searchKey, pageNum, onLoadDeviceList])
  useEffect(() => {
    let resource = []
    let relation_cis = []
    selectedList.forEach(e => {
      resource.push({
        name: e.name,
        className: e.className,
        status: 0,
        taskId: null,
        id: e.id
      })
      relation_cis.push({
        id: e.id,
        name: e.name,
        type: e.className,
        code: 'resource'
      })
    })
    console.log(selectedList)
    console.log(relation_cis, resource)
    props.dispatch({
      type: 'order/setOrder',
      payload: {
        relation_cis: relation_cis
      }
    })
    props.dispatch({
      type: 'order/setForm',
      payload: {
        resource: resource
      }
    })
  }, [props, selectedList])
  const handleDeviceSelect = (device) => {
    let index = selectedList.findIndex(e => e.id === device.id)
    let arr = [...selectedList]
    console.log(index)
    if (index === -1) {
      setSelectedList([...arr, device])
    } else {
      arr.splice(index, 1)
      setSelectedList([...arr])
    }
  }
  const handleInfiniteOnLoad = (v) => {
    setPageNum((v) => v + 1)
    setLoading(true)
  }
  const handleKeySearch = (v) => {
    setSearchKey(v)
    setHasMore(true)
    setPageNum(0)
    setDeviceList([])
  }
  const handleSearch = (v) => {
    setShowDeviceClass(deviceClass.filter(e => e.name.indexOf(v) !== -1))
  }
  const handleChange = (v) => {
    setCode(v)
    setSearchKey('')
    setHasMore(true)
    setPageNum(0)
    setDeviceList([])

  }

  //// 请求
  async function onLoadDeviceByClassCode() {
    const data = await queryDeviceByClassCode('')
    //查找classcode列表 和 缓存展现列表
    setDeviceClass(data)
    setShowDeviceClass(data)
  }
  async function onLoadDeviceList(p) {
    const data = await queryDeviceList(p)
    if (data.dataList && data.dataList.length) {
      if (data.dataList.length < 10) setHasMore(false)
      setDeviceList([...deviceList, ...data.dataList])
      setLoading(false)
    }
  }

  const options = showDeviceClass.map(d => (<Option key={d.code}>{d.name}</Option>))
  return (
    <WingBlank>
      <WhiteSpace />
      <HeaderNormal title="选择关联设备" rightContent={( <Button type="link" size='small' onClick={() => {router.go(-1)}} style={{color:"#fff"}}>确定</Button>)}/>
      <Paragraph>
        请先选择需要检索的设备类型！
      </Paragraph>
      <Row gutter={16}>
        <Col span={12}>
          <Select showSearch
            velue={code}
            placeholder={'选择设备类型'}
            style={{ width: '100%' }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            notFoundContent={null}>{options}</Select>
        </Col>
        <Col span={12}>
          <Search
            onSearch={handleKeySearch} />
        </Col>
      </Row>
      <div style={{ height: '10.4rem', overflow: 'auto' }}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && hasMore}
          useWindow={false}>
          <List
            dataSource={deviceList}
            renderItem={item => (
              <List.Item key={item.id} >
                {selectedList.findIndex(e => e.id === item.id) === -1
                  ? (
                    <>
                      <List.Item.Meta
                        avatar={(<Button className={styles.seleted_icon} shape="circle" size='small' onClick={() => { handleDeviceSelect(item) }} />)}
                        title={item.name}
                        description={item.className}
                      />
                      <Button type="link" size='small' onClick={() => { handleDeviceSelect(item) }}>选择</Button>
                    </>
                  )
                  : (
                    <>
                      <List.Item.Meta
                        avatar={(<Button className={styles.seleted_icon} shape="circle" type="primary" icon="check" size='small' onClick={() => { handleDeviceSelect(item) }} />)}
                        title={item.name}
                        description={item.className}
                      />
                      <Button type="link" size='small' style={{ color: 'red' }} onClick={() => { handleDeviceSelect(item) }}>取消</Button>
                    </>
                  )
                }
              </List.Item>
            )}
          >
            <div style={{ textAlign: 'canter' }}>{hasMore ? '' : '没有更多了..'}</div>
          </List>
        </InfiniteScroll>
      </div>
    </WingBlank>
  )
}

export default connect(({ order }) => ({ order }))(DeviceSellist)