import { useState, useEffect } from 'react'
import styles from './form.less'
import { router } from 'umi'
import { connect } from 'dva'
import { List, WingBlank, WhiteSpace, Modal, Toast } from 'antd-mobile'
import { createOrder, queryOrderModel, updateImage } from '@/request/request'
import { ORDER_STATE_SL_KEY } from '@/config'
import order_config from '@/order_config'
import { order_mixin } from '@/utils/order_mixin'


import HeaderNormal from '@/components/globel/HeaderNormal'
import Form from '@/components/Form/Form'
import Attachfile from '@/components/form/components/Attachfile' 
import HandleButton from '@/components/Form/components/HandleButton'


const Forms = (props) => {
  const [orderModel, setOrderModel] = useState("")
  const [formList, setFormList] = useState([])
  const [formHandle, setFormHandle] = useState([])
  const [showFileUp, setShowFileUp] = useState(false)
  const [imgFile, setImgFile] = useState([])

  const orderValueChange = (key, value) => {
    props.dispatch({
      type: 'order/setForm',
      payload: {
        [key]: value
      }
    })
  }
  const handleOrder = (handle) => {
    Modal.alert('确认信息', '是否创建工单?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        console.log('ok')
        // handleCreateOrder()
        Toast.loading("创建中……", 0)
        createOrder({
          ...props.order,
          title: props.order.form.title,
          urgent_level: props.order.form.urgentLevel,
          description: props.order.form.ticketDesc,
          handle_rules: {
            ...handle
          }
        })
        .then((d) => {
          Toast.loading("上传图片", 0)
          const imgs = []
          imgFile.map((i) => {
            imgs.push(i.url.split(',')[1])
          })
          updateImage({
            ticketId: d.data.id,
            filesBase64: imgs
          }).then(() => {
            Toast.success("成功", 1)
            props.dispatch({
              type: 'order/clearState',
              payload: {}
            })
            router.push({
              pathname: '/order/page/' + d.data.id,
              query: {
                // actid: d.data.activityId,
                modelId: d.data.modelId
              }
            })
          })
        })
      }, style: 'default' },
    ])
  }
  // 如果被刷新的情况
  useEffect(() => {
    let saveData = sessionStorage.getItem(ORDER_STATE_SL_KEY)
    if (props.order.model_id === '') {
      props.dispatch({
        type: 'order/setOrder',
        payload: {
          ...JSON.parse(saveData)
        }
      })
      setOrderModel(saveData.model_id)
    }
    const onload = async () => {
      const modelId = props.order.model_id || JSON.parse(saveData).model_id
      const model = await queryOrderModel({modelId: modelId})
      const follow = model.name;
      if(order_config[modelId]) {
        const mixin =  order_config[modelId] 
        setFormList(order_mixin(model.field_list, mixin.rules[follow] || {}))// 混入表单规则
      } else {
        setFormList(model.field_list)
      }
      setShowFileUp(model.field_list.findIndex((v) => {
        if(v.code === 'file') {
          return true
        }
      }) >= 0)// 是否上传图片
      setFormHandle(model.handle_rules)// 设置流转规则
    }
    onload()
  }, [])
  return (
    <WingBlank>
      <WhiteSpace />
      <HeaderNormal title="工单创建" />
      <List className={styles.list}>
        {formList.map(model => (
          <Form key={model.code}
            formModel={model}
            value={props.order.form[model.code] || ''}
            cb={orderValueChange}
          />
        ))}
        {showFileUp && <Attachfile cb={(img) => {
          setImgFile(img)
        }}/>}
      </List>
      <WhiteSpace />
      {formHandle.map(h => (<HandleButton key={h.route_id} handle={h} cb={handleOrder} />))}
      <WhiteSpace />
    </WingBlank>
  )
}

export default connect(({ order }) => ({ order }))(Forms)