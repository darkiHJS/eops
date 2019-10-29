import { useState } from 'react'
import { InputItem, List } from 'antd-mobile';
import ListView from './ListView'

const Item = List.Item;

export default ({model, value, cb, showMode}) => {
  const [ inputValue, setInputValue ] = useState(value || '')
  return showMode ?
  (<ListView  name={model.name}>{value}</ListView>)
  :(
    <InputItem 
      labelNumber={model.name.length < 5 ? 5 : model.name.length}
      defaultValue={'XXXXX部门'}
      // value={inputValue} 
    >{model.name}</InputItem>
  )
}