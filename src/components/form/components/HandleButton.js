import { useState, useEffect } from 'react'
import { Button, Modal, Tabs } from 'antd-mobile';

export default ({ handle, cb }) => {
  const [showModel, setShowModel] = useState(false)
  const [groups, setGroups] = useState({})
  console.log(handle)
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
    if (Object.keys(handle.executors_groups).length){
      setGroups({
        key: Object.keys(handle.executors_groups)[0],
        groups: {
          ...handle.executors_groups[Object.keys(handle.executors_groups)[0]]
        }
      })
    }
    
  }, [])
  const tabs = [
    { title: "处理人", sub: 1 },
    { title: "处理组", sub: 2 },
  ];
  return (
    <>
      <Modal
        visible={showModel}
        transparent
        maskClosable={false}
        // onClose={this.onClose('modal1')}
        title="Title"
        footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
        // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        afterClose={() => { alert('afterClose'); }}
      >
        <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of first tab
      </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of second tab
      </div>
        </Tabs>
      </Modal>
      <Button type="primary" onClick={handleClick}>{handle.name}</Button>
    </>
  )
}