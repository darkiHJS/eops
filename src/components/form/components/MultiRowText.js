import { useState } from 'react'
import { TextareaItem, WhiteSpace, List } from 'antd-mobile';
import ListView from './ListView'

const Item = List.Item;
const Brief = Item.Brief;

export default ({ model, value, cb, showMode }) => {
  const [inputValue, setInputValue] = useState(value || '')
  return showMode ?
    (
      <ListView  name={model.name}>{value}</ListView>
    ) :
    (
      <>
        <TextareaItem
          title={model.name}
          value={inputValue}
          rows={3}
          placeholder={'请输入'}
          onChange={v => { setInputValue(v) }}
          onBlur={v => cb(v)}
        />
        <WhiteSpace size='md' />
      </>
    )
}