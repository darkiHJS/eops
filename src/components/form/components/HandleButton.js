import { useState, useEffect } from 'react'
import { Modal, Tabs, Button } from 'antd-mobile';
import { Tag, message } from 'antd'
import './HandleButton.less'

const { CheckableTag } = Tag;

export default (props) => {
  const { handle, cb, model } = props
  const [showModel, setShowModel] = useState(false)
  const [groups, setGroups] = useState(null)
  const [selectGroups, setSelectGroups] = useState({ user: [], group: [] })
  const handleClick = () => {
    if (groups && groups.key) {
      setShowModel(true)
    } else {
      cb({
        route_id: handle.route_id
      })
    }
  }
  useEffect(() => {
    if (model && model.policy === 3) {
      setGroups({
        key: Object.keys(handle.executors_groups)[0],
        groups: {
          ...handle.executors_groups[Object.keys(handle.executors_groups)[0]]
        }
      })
    }
  }, [handle.executors_groups, model])

  useEffect(() => { console.log(selectGroups)}, [selectGroups])
  const tabs = [
    { title: "处理人", sub: 1 },
    { title: "处理组", sub: 2 },
  ];
  // const next_handleUser = () => {
  //   if()
  // }

  const userGroups = () => {
    if (!groups || groups.key === undefined) return
    console.log(groups)
    return groups.groups.user.map((u) => {
      return (
        <CheckableTag
          checked={selectGroups.user.findIndex(e => e === u.id) !== -1}
          onChange={checked => {
            console.log(checked)
            if (checked) {
              setSelectGroups({ ...selectGroups, user: [...selectGroups.user, u.id] })
            } else {
              setSelectGroups({ ...selectGroups, user: [...selectGroups.user.filter(e => e !== u.id)] })
            }
          }}>
          {u.name}
        </CheckableTag>
      )
    })
  }
  const groupGroups = () => {
    if (!groups || groups.key === undefined) return
    console.log(groups)
    return groups.groups.group.map((u) => {
      return (
        <CheckableTag
          checked={selectGroups.group.findIndex(e => e === u.id) !== -1}
          onChange={checked => {
            console.log(checked)
            if (checked) {
              setSelectGroups({ ...selectGroups, group: [...selectGroups.group, u.id] })
            } else {
              setSelectGroups({ ...selectGroups, group: [...selectGroups.group.filter(e => e !== u.id)] })
            }
          }}>
          {u.name}
        </CheckableTag>
      )
    })
  }
  return (
    <>
      <Modal
        visible={showModel}
        transparent
        maskClosable={false}
        onClose={() => { setShowModel(false) }}
        title="指派处理人"
        footer={[{
          text: '好', onPress: () => {
            let handle_rules = {}
            if (!selectGroups.user.length && !selectGroups.group.length) {
              console.log('好')
              message.warning('必须指定一个处理人或处理组')
              return;
            }
            cb({
              route_id: handle.route_id,
              executors_groups: {
                [Object.keys(handle.executors_groups)[0]]:{
                  ...selectGroups
                }
              }
            })
          }
        }]}
      // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
      // afterClose={() => { alert('afterClose'); }}
      >
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ textAlign: 'left', padding: '.2rem', height: '150px' }}>
            {userGroups()}
          </div>
          <div style={{ textAlign: 'left', padding: '.2rem', height: '150px' }}>
            {groupGroups()}
          </div>
        </Tabs>
      </Modal>
      <Button type="primary" onClick={handleClick}>{handle.name}</Button>
    </>
  )
}