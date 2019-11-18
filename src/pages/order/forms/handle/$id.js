import { useState, useEffect } from 'react'
import styles from './styles.less'
import { queryOrderModel, queryOrderInfo, handleOrder } from '@/request/request'
import { router } from 'umi'
import Form from '@/components/Form/Form'
import { List, WingBlank, WhiteSpace, Button, Modal, Popover, Toast } from 'antd-mobile'
import antd, { Tag } from 'antd'
import { queryOrderExecutor, changeOrderExecutor } from '@/request/request'

import HeaderNormal from '@/components/globel/HeaderNormal'
import HandleButton from '@/components/Form/components/HandleButton'
import IconFont from '@/components/globel/IconFont';

const Item = Popover.Item
const AntdModal = antd.Modal
const { CheckableTag } = Tag;

const HandleForms = (porps) => {
  const { match, location } = porps
  const [orderModel, setOrderModel] = useState([])
  const [executors, setExecutors] = useState([])
  const [orderInfo, setOrderInfo] = useState([])
  const [orderData, setOrderData] = useState([])
  const [formHandle, setFormHandle] = useState([])
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showExeCange, setShowExeCange] = useState(false)
  const [execUserAndGroups, setExecUserAndGroups] = useState({})
  const [execUsers, setExecUsers] = useState([])
  const [execGroups, setExecGroups] = useState([])


  const loadOrderModel = () => {
    queryOrderModel({
      ...location.query
    }).then(d => {
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
        setOrderInfo(d)
        console.log(d)
        setOrderData(serialize)
        setFormHandle(d.handle_rules)
        setExecutors(d.executors)
      })
  }
  const orderToNext = ({ route_id }) => {
    Modal.alert('确认信息', '是否提交工单?', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
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
            router.push({
              pathname: '/order/page/' + match.params.id,
              query: {
                modelId: location.query.modelId
              }
            })
          })
        }, style: 'default'
      },])
  }
  const toOrderExecutorChange = () => {
    queryOrderExecutor({
      modelId: orderInfo.model_id,
      actId: orderInfo.activity_id,
      executors: executors[0]
    }).then(d => {
      if (Object.keys(d).length) {
        setExecUserAndGroups(d)
        setShowExeCange(true)
      } else {
        Toast.offline('没有可以改派人和组。', 1);
      }
    })
  }
  const handleChangeUsers = (tag, checked) => {
    const nextExecUsers = checked ? [...execUsers, tag] : execUsers.filter(t => t !== tag);
    setExecUsers(nextExecUsers)
  }
  const handleChangeGroups = (tag, checked) => {
    const nextExecGroups = checked ? [...execGroups, tag] : execGroups.filter(t => t !== tag);
    setExecGroups(nextExecGroups)
  }
  const handleChangeExecutor = () => {
    if(execGroups.length || execUsers.length) {
      Toast.loading('改派中...', 0)
      changeOrderExecutor({
        ticketId: match.params.id,
        tacheId: orderInfo.activity_id,
        executor: executors[0] + ',' + execUsers.join(','),
        group: execGroups.join(',')
      }).then(() => {
        Toast.success('改派成功', 1)
        router.push('/order')
      })
      .catch(() => {Toast.fail('改派失败', 1)})
    }else {
      Toast.fail('必须指定一个改派人或组！', 1);
    }
  }
  useEffect(() => {
    loadOrderModel()
    loadOrderInfo()
  }, [])
  return (
    <>
      <HeaderNormal title={'工单页'} route={'/order'} rightContent={[
        (<Popover mask
          align={{
            overflow: { adjustY: 0, adjustX: 0 },
            offset: [0, 20],
          }}
          visible={showMoreMenu}
          onVisibleChange={(v) => setShowMoreMenu(v)}
          onSelect={(opn) => {
            if (opn.key === '4') {
              toOrderExecutorChange()
              setShowMoreMenu(false)
            }
          }}
          overlay={[
            (<Item key="4" value="scan" icon={<IconFont key="0" type="icongaipai" />}>改派</Item>),
            (<Item key="5" value="scan" disabled icon={<IconFont key="0" type="iconorder-close" />}>关单</Item>),
            (<Item key="6" value="scan" disabled icon={<IconFont key="0" type="iconfeichu" />}>废除</Item>),
          ]}>
          <IconFont key="0" type="icongengduo" />
        </Popover>)
      ]} />
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
      <AntdModal
        title="改派工单"
        visible={showExeCange}
        onOk={handleChangeExecutor}
        onCancel={() => { setShowExeCange(false) }}
      >
        <h4>处理人</h4>
        <div className={styles.drawer_open}>
          {execUserAndGroups.users ?
            execUserAndGroups.users.map((u) => {
              return (
                <CheckableTag
                  className={styles.drawer_tag}
                  key={u.name}
                  checked={ execUsers.indexOf(u.id) !== -1}
                  onChange={checked => handleChangeUsers(u.id, checked)}
                >
                  {u.name}
                </CheckableTag>
              )
            })
            : "没有处理人"}
        </div>
        <h4>处理组</h4>
        <div className={styles.drawer_open}>
          {execUserAndGroups.groups ?
            execUserAndGroups.groups.map((g) => {
              return (
                <CheckableTag
                  className={styles.drawer_tag}
                  key={g.name}
                  checked={ execGroups.indexOf(g.id) !== -1}
                  onChange={checked => handleChangeGroups(g.id, checked)}
                >
                  {g.name}
                </CheckableTag>
              )
            })
            : "没有处理组"}
        </div>
      </AntdModal>
    </>
  )
}

export default HandleForms