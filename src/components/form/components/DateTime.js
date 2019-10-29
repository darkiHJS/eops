import { useState, useEffect } from 'react'
import { DatePicker, List } from 'antd-mobile';
import ListView from './ListView'
const Item = List.Item;
// const Brief = Item.Brief;

export default ({ model, value, cb, showMode }) => {
  const [date, setDate] = useState(value || new Date())
  useEffect(() =>{
    if(!value) {
      cb(date)
    }
  }, [])
  return showMode ? (<ListView name={model.name}>{value}</ListView>)
    : (<DatePicker
      value={date}
      onChange={date => {
        cb(date)
        setDate(date)
      }}
    >
      <List.Item arrow="horizontal">{model.name}</List.Item>
    </DatePicker>)
}