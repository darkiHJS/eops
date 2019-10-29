import { useState } from 'react'
import { TextareaItem, Menu, List } from 'antd-mobile';
import ListView from './ListView'

const Item = List.Item;
const Brief = Item.Brief;

const util_getValueOfLabels = (valueArr, params) => {
  let p = params.filter(param => {
    return valueArr.indexOf(param.value) !== -1
  })
  if(p.length) return p.map((v) => v.label)
  return []
}

export default ({ model, value, cb, showMode }) => {
  const [inputValue, setInputValue] = useState([...value])
  const [show, setShow ] = useState(false) 
  return showMode ? 
  (<ListView  name={model.name}>{util_getValueOfLabels(inputValue, model.params).join(', ')}}</ListView>) :
  (
    <>
      <TextareaItem
        title={model.name}
        value={util_getValueOfLabels(inputValue, model.params).join(', ')}
        placeholder={`点击选择${model.name}`}
        editable={0}
        onClick={() => {setShow(!show)}}
        autoHeight
      />
      {show ?
        (<Menu
          className="single-multi-foo-menu"
          data={model.params}
          value={[...inputValue]}
          level={1}
          height={document.documentElement.clientHeight * 0.6}
          onChange={ (v) => {
            cb(v)
            setInputValue(v)
          }}
          onCancel={ () => {setShow(false)}}
          onOk={() => {setShow(false)}}
          multiSelect
        />):
        null
      }
    </>
  )
}