import { useState, useEffect } from 'react'
import { InputItem, List } from 'antd-mobile';
import ListView from './ListView'


export default ({ model, value, cb, showMode }) => {
  const [inputValue, setInputValue] = useState(value || '')
  useEffect(() => {
    setInputValue(value)
  }, [value])
  return showMode ?
    (<ListView  name={model.name}>{value}</ListView>) :
    (
      <InputItem
        labelNumber={model.name.length < 5 ? 5 : model.name.length}
        value={inputValue}
        placeholder="请输入"
        onChange={v => { setInputValue(v) }}
        onBlur={v => cb(v)}
      >{model.name}</InputItem>
    )
}