import { useState, useEffect } from 'react'
import { DatePicker, List } from 'antd-mobile';
import { formatDate } from '@/utils/index'
import ListView from './ListView'
const Item = List.Item;
// const Brief = Item.Brief;

export default ({ model, value, cb, showMode }) => {
  const [date, setDate] = useState('')
  useEffect(() =>{
    if(value !== '' && value !== "1") {
      console.log(value)
      setDate(new Date(value))
      cb(new Date(value))
    }
  }, [cb, value])
  return showMode ? (<ListView name={model.name}>{ value ? formatDate(new Date(value), 'YYYY-MM-DD hh:mm:ss') : ''}</ListView>)
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