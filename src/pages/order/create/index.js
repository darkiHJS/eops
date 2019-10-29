import React, { useState, useEffect } from 'react';
import styles from './index.less'
import { connect } from 'dva';
import router from 'umi/router'
import axios from '@/request/http'
import { USER_MODEL_ID } from '@/config'
import { WingBlank } from 'antd-mobile'

import HeaderNormal from '@/components/globel/HeaderNormal'
import OrderModel from '@/components/order/OrderModel'

const Comp = (props) => {
  const [ orderModel, setOrderModel ] = useState([])

  useEffect(() => {
    onloadOrderModel(setOrderModel)
  }, [])

  const routerToDeviceSelect = (orderInfo) => {
    props.dispatch({
      type: 'order/clearState',
      payload: {}
    })
    props.dispatch({
      type: 'order/setOrder',
      payload: {
        model_id: orderInfo.model_id,
        ticket_source: 'wchart',
        title: '',
        urgent_level: 2
      }
    })
    router.push('/order/create/form')
  }
  return (
    <>
      <HeaderNormal title='创建工单 - 选择业务模型' />
      <WingBlank>
        <div className={styles.modules}>
          {orderModel.map((model) => (
            <OrderModel model={model} key={model.id} routerTo={routerToDeviceSelect}/>
          ))}
        </div>
      </WingBlank>
    </>
  )
}

const onloadOrderModel = async (fn) => {
  await axios({
    method: 'get',
    url: '/ticket/getModelByApikey'
  })
  .then(d => {
    fn(d.data)
  })
  .catch(e => {
    fn([])
  })
}

export default connect(({order}) => ({order}))(Comp)