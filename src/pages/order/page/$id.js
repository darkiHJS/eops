import { useState, useEffect } from 'react'
import styles from './index.less'
import { router } from 'umi'
import { queryOrderModel, queryLastOrderModel, queryOrderInfo, handleOrder } from '@/request/request'

import Form from '@/components/Form/Form'
import HeaderNormal from '@/components/globel/HeaderNormal'
import OrderHandleBtn from '@/components/order/OrderHandleBtn'
import { List, WingBlank, WhiteSpace, Button, Steps, Popover } from 'antd-mobile'
import IconFont from '@/components/globel/IconFont';

const Step = Steps.Step;

export default (porps) => {
  const { match, location } = porps
  const [orderModel, setOrderModel] = useState([])
  const [executors, setExecutors] = useState([])
  const [orderInfo, setOrderInfo] = useState([])
  const [orderData, setOrderData] = useState([])
  const [formHandle, setFormHandle] = useState([])

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
        console.log(d)
        setOrderData(serialize)
        setFormHandle(d.handle_rules)
        setExecutors(d.executors)
      })
  }
  const orderSetExecutor = (fn) => {
    handleOrder({
      ticket_id: match.params.id,//工单id
      model_id: location.query.modelId,//模型id
      activity_id: location.query.actid || orderInfo.activity_id,//当前环节id
      handle_type: "0", // 接单
    }).then((d) => {
      fn(d)
    })
  }
  useEffect(() => {
    loadOrderModel()
    loadOrderInfo()
  }, [loadOrderInfo, loadOrderModel])

  return (
    <>
      <HeaderNormal title={'工单页'} route={'/order'} rightContent={[
        (<Popover mask
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [0, 20],
          }}
          overlay={[
            (
              <div style={{ width: "80vw", padding: '.2rem' }}>
                <List renderHeader={() => '工单进度'} />
                <div style={{ backgroundColor: "#ffffff", paddingTop: "15px", paddingBottom: '15px' }}>
                  <WingBlank>
                    <Steps size="small" current={1}>
                      <Step title="申请" description="" />
                      <Step title="审核" description="" />
                      <Step title="批准" description="" />
                      <Step title="完成" description="" />
                    </Steps>
                  </WingBlank>
                </div>
              </div>)
          ]}>
          <IconFont key="0" type="iconliucheng1-copy" />
        </Popover>)
      ]}
      />
      <WingBlank size="sm">
        <div className={styles.order}>
          <List renderHeader={() => '工单详情'} />
          {orderModel.map(e => (<Form key={e.code}
            formModel={e}
            value={orderData[e.code] || ''}
            cb={() => { }}
            showMode={true}
          />))}
        </div>
        <List renderHeader={() => '操作'} />
        <WhiteSpace size="sm" />
        <OrderHandleBtn 
          executors={executors} 
          isreceived={orderInfo.isreceived} 
          orderSetExecutor={orderSetExecutor}
          toHandleOrder={toHandleOrder}
          status={orderInfo.status}
        />
        <Button onClick={() => { router.push('/order') }}>返回</Button>
        <WhiteSpace size="lg" />
      </WingBlank>
    </>
  )
}