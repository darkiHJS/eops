import { useState, useEffect } from 'react'
import { queryOrderModel, queryOrderInfo,  handleOrder } from '@/request/request'
import { connect } from 'dva'
import { router } from 'umi'
import Form from '@/components/Form/Form'
import { List, WingBlank, WhiteSpace, Button, Modal } from 'antd-mobile'

import HeaderNormal from '@/components/globel/HeaderNormal'
import HandleButton from '@/components/Form/components/HandleButton'


const SESSIONSTORAGE_KEY = "SUNGCOR_snadjkncvekekek2l210102kemem9838kk2909032"  //sessionStorage Key

const HandleForms = (porps) => {
  const { match, location } = porps
  const [orderModel, setOrderModel] = useState([])
  const [executors, setExecutors] = useState([])
  const [orderInfo, setOrderInfo] = useState([])
  const [orderData, setOrderData] = useState([])
  const [formHandle, setFormHandle] = useState([])
  
  console.log(match, location)

  const loadOrderModel = () => {
    queryOrderModel({
      ...location.query
    }).then(d => {
      console.log(d)
      setOrderModel(d.field_list)
    })
  }
  const loadOrderInfo = () => {
    queryOrderInfo(match.params.id)
    .then(d => {
      let serialize = {}
      d.form.map((form) => {
        serialize[form.code] = form.default_value
      })
      console.log(d)
      setOrderInfo(d)
      setOrderData(serialize)
      setFormHandle(d.handle_rules)
      setExecutors(d.executors)
    })
  }
  const orderToNext = ({route_id}) => {
    Modal.alert('确认信息', '是否提交工单?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        console.log('ok')
        // handleCreateOrder()
        handleOrder({
          ticket_id: match.params.id,//工单id
          model_id: location.query.modelId,//模型id
          activity_id: location.query.actId,//当前环节id
          handle_type: "1",
          form: {
            ...orderData
          },
          handle_rules: {
            route_id: route_id
          }  
        }).then(d => {
          console.log(d)
          router.push({
            pathname: '/order/page/' + match.params.id,
            query: {
              modelId: location.query.modelId
            }
          })
        })
      }, style: 'default' },])
  }

  useEffect(() => {
    loadOrderModel()
    loadOrderInfo()
  }, [])

  return (
    <>
      <HeaderNormal title={'工单页'} route={'/order'} />
      <WingBlank size="sm">
        <List renderHeader={() => '工单详情'} />
        {orderModel.map(e => (<Form key={e.code}
          formModel={e}
          value={orderData[e.code] || ''}
          cb={(k, v) => {
            setOrderData({
              ...orderData,
              [k]: v
            })
          }}
        />))}
        <List renderHeader={() => '操作'} />
        <WhiteSpace size="sm" />
        {formHandle.map(h => (
          <>
            <HandleButton key={h.route_id} handle={h} cb={orderToNext} />
            <WhiteSpace size="sm" />
          </>
        ))}
        <Button onClick={() => { router.push('/order') }}>返回</Button>
        <WhiteSpace size="lg" />
      </WingBlank>
    </>
  )
}

export default HandleForms