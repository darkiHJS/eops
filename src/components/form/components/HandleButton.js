import { useState, useEffect } from 'react'
import { Modal, Tabs, Button} from 'antd-mobile';
import { Tag } from 'antd'

import './HandleButton.less'

export default (props) => {
  const { handle, cb, model } = props
  const [showModel, setShowModel] = useState(false)
  const [groups, setGroups] = useState({})

  const handleClick = () => {
    if (groups.key) {
      setShowModel(true)
    } else {
      cb({
        route_id: handle.route_id
      })
    }
  }
  useEffect(() => {
    console.log(props)

  }, [props])
  useEffect(() => {
    if (model && model.policy === 0){
      setGroups({
        key: Object.keys(handle.executors_groups)[0],
        groups: {
          ...handle.executors_groups[Object.keys(handle.executors_groups)[0]]
        }
      })
    }
  }, [handle.executors_groups, model])
  const tabs = [
    { title: "处理人", sub: 1 },
    { title: "处理组", sub: 2 },
  ];
  // const next_handleUser = () => {
  //   if()
  // }
  return (
    <>
      <Modal
        visible={showModel}
        transparent
        maskClosable={false}
        onClose={() => { setShowModel(false) }}
        title="指派处理人"
        footer={[{ text: '好', onPress: () => { console.log('ok'); setShowModel(false) } }]}
      // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      // afterClose={() => { alert('afterClose'); }}
      >
        <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{textAlign: 'left', padding: '.2rem',  height: '150px'}}>
            {groups.groups? groups.groups.user.map(v => (<Tag style={{marginRight: '.1rem'}}>{v.name}</Tag>)) : '没有下一节点处理人'}
          </div>
          <div style={{textAlign: 'left', padding: '.2rem',  height: '150px'}}>
            {groups.groups? groups.groups.user.map(v => (<Tag style={{marginRight: '.1rem'}}>{v.name}</Tag>)) : '没有下一节点处理人'}
          </div>
        </Tabs>
      </Modal>
      <Button type="primary" onClick={handleClick}>{handle.name}</Button>
    </>
  )
}