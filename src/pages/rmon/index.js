import { useState } from 'react'
import { SearchBar, Tabs, List } from 'antd-mobile'
import { router } from 'umi'
import { Drawer, Tag } from 'antd';
import styles from './index.less'
import HeaderNormal from '@/components/globel/HeaderNormal'
import RmonItem from '@/components/rmon/RmonItem'

const { CheckableTag } = Tag;
const tagsFromOrderType = ['工单类型1', '工单类型2', '工单类型3', '工单类型4', '我的待办', '我的参与', '已完成', '逾期',]

const tabs = [
  { title: '故障资源', sub: 1 },
  { title: '告警信息', sub: 2 },
  { title: '所有资源', sub: 3 },
];

export default () => {
  const [ selectedTags, setSelectedTags ] = useState([])
  const [ drawerOpen, setDrawerOpen ] = useState(false)
  const routerTo = (romndevice) => {
    router.push({
      pathname: '/rmon/' + romndevice.id
    })
  }
  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags)
  }
  const handleClose = (tag) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }
  return (
    <div>
      <HeaderNormal title="设备性能监控" />
      <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      />
      <SearchBar
        className={styles.search}
        showCancelButton
        placeholder="搜索配置名称"
        cancelText="筛选"
        onSubmit={value => console.log(value, 'onSubmit')}
        onClear={value => console.log(value, 'onClear')}
        onFocus={() => console.log('onFocus')}
        onBlur={() => console.log('onBlur')}
        onCancel={() => { setDrawerOpen(true) }}
      />
      <Drawer
        className={styles.drawer}
        placement="right"
        closable={false}
        onClose={() => { setDrawerOpen(false) }}
        visible={drawerOpen}
      >
        <List renderHeader={() => '已选择条件'} />
        <div className={styles.drawer_open}>
          {selectedTags.map((tag => (
            <Tag key={tag} closable={true} onClose={() => handleClose(tag)}>
              {tag}
            </Tag>
          )))}
        </div>
        <List renderHeader={() => '工单类型'} />
        <div className={styles.drawer_open}>
          {tagsFromOrderType.map((tag => (
            <CheckableTag
              className={styles.drawer_tag}
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={checked => handleChange(tag, checked)}
            >
              {tag}
            </CheckableTag>
          )))}
        </div>
      </Drawer>
      <RmonItem rmondevice={{name:'show01', from: 'IMSD服务器', id:'01'}} routerTo={routerTo}/>
      <RmonItem rmondevice={{name:'10.11.42.119', from: '东智服务器', id:'01'}} routerTo={routerTo}/>
      <RmonItem rmondevice={{name:'本地服务器', from: '大华', id:'01'}} routerTo={routerTo}/>
      <RmonItem rmondevice={{name:'流量监控服务器', from: '华为', id:'01'}} routerTo={routerTo}/>
    </div>
  )
}