import { useState, useEffect } from 'react'
import { InputItem, WhiteSpace, Icon } from 'antd-mobile';
import { router } from 'umi'
import ListView from './ListView'

export default ({ model, value, cb, showMode }) => {
  const [inputValue, setInputValue] = useState(value || [{name: ''}])

  return showMode ?
  (<ListView  name={model.name}>{value[0] ? value[0].name  + ' - ' + value[0].className : '无关联设备'}</ListView>) :
  (
    <>
      <WhiteSpace size='md' />
      <InputItem
        labelNumber={model.name.length < 5 ? 5 : model.name.length}
        value={inputValue[0].name}
        placeholder="点击关联设备"
        editable={0}
        extra={(<Icon type="right"/>)}
        onExtraClick={() => { router.push('device_select') }}
      >{model.name}</InputItem>
      <WhiteSpace size='md' />
    </>
  )
}