import { useState, useEffect } from 'react'
import styles from './index.less'
import { router } from 'umi'
import { queryOrderModel, queryLastOrderModel, queryOrderInfo, handleOrder } from '@/request/request'
import { local_get } from '@/utils/index'
import { USER_INFO_ID } from '@/config'

import Form from '@/components/Form/Form'
import HeaderNormal from '@/components/globel/HeaderNormal'
import HandleButton from '@/components/Form/components/HandleButton'
import { List, WingBlank, WhiteSpace, Button, Steps } from 'antd-mobile'

const Step = Steps.Step;

export default (porps) => {
  const { match, location } = porps
  const [orderModel, setOrderModel] = useState([])
  const [executors, setExecutors] = useState([])
  const [orderInfo, setOrderInfo] = useState([])
  const [orderData, setOrderData] = useState([])
  const [formHandle, setFormHandle] = useState([])
  const [ more, setMore ] = useState(false)

  const toHandleOrder = () => {
    // 跳转到处理页
    router.push({
      pathname: '/order/forms/handle/' + match.params.id,
      query: {
        actId: location.query.actId || orderInfo.activity_id,
        modelId: location.query.modelId
      }
    })
    // 上传工单信息
  }

  const handleRule = () => {
    // 判断是否有权限
    if (executors.indexOf(local_get(USER_INFO_ID).userId) !== -1) {
      if (orderInfo.isreceived === 1) {
        return (
          <>
            <Button onClick={() => {
              // 接单操作
              handleOrder({
                ticket_id: match.params.id,//工单id
                model_id: location.query.modelId,//模型id
                activity_id: location.query.actid || orderInfo.activity_id,//当前环节id
                handle_type: "0", // 接单
              }).then(() => {
                loadOrderInfo()
              })
            }}>接单</Button>
            <WhiteSpace size="sm" />
          </>
        )
      }
      return (
        <>
          <Button onClick={() => {
            // 接单操作
            toHandleOrder()
          }}>处理工单</Button>
          <WhiteSpace size="sm" />
        </>
      )
    }
    return null
  }

  const loadOrderModel = () => {
    queryOrderModel({
      ...location.query,
    }).then(d => {

      if (d.activiti_type === 'EndNoneEvent') {
        queryLastOrderModel({
          ...match.params
        }).then((ld) => {
          setOrderModel(ld.field_list)
        })
      } else {
        setOrderModel(d.field_list)
      }
    })
  }
  const loadOrderInfo = () => {
    queryOrderInfo(match.params.id)
      .then(d => {
        let serialize = {}
        d.form.map((form) => {
          serialize[form.code] = form.default_value
        })
        setOrderInfo(d)
        setOrderData(serialize)
        setFormHandle(d.handle_rules)
        setExecutors(d.executors)
      })
  }
  useEffect(() => {
    loadOrderModel()
    loadOrderInfo()
  }, [])

  return (
    <>
      <HeaderNormal title={'工单页'} route={'/order'} />
      <WingBlank size="sm">
        <div className={styles.order} style={{height: more ? 'auto':'35vh' }}>
          <List renderHeader={() => '工单详情'} />
          {orderModel.map(e => (<Form key={e.code}
            formModel={e}
            value={orderData[e.code] || ''}
            cb={() => { }}
            showMode={true}
          />))}
          {more ? null : (<div className={styles.bottom_curtain}>
            <a onClick={() => {setMore(true)}}>显示更多</a>
          </div>)}
        </div>

        <List renderHeader={() => '工单进度'} />
        <div style={{ backgroundColor: "#ffffff", paddingTop: "15px" }}>
          <WingBlank>
            <Steps size="small" current={1}>
              <Step title="申请" description="清明时节雨纷纷，" />
              <Step title="审核" description="路上行人欲断魂。" />
              <Step title="批准" description="借问酒家何处有，" />
              <Step title="完成" description="牧童遥指杏花村。" />
            </Steps>
          </WingBlank>
        </div>
        <List renderHeader={() => '操作'} />
        <WhiteSpace size="sm" />
        {handleRule()}
        <Button onClick={() => { router.push('/order') }}>返回</Button>
        <WhiteSpace size="lg" />
      </WingBlank>
    </>
  )
}