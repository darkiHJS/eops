import { useState, useEffect } from 'react'
import styles from './ListSel.less'
import { InputItem, Menu, WhiteSpace, List, Icon } from 'antd-mobile';
import ListView from './ListView'

const Item = List.Item;

const util_getValueOfLabel = (value, params) => {
  let p = params.filter(param => {
    return param.value === value
  })
  if(p.length) return p[0].label
  return ''
}

export default ({model, value, cb, showMode}) => {
  const [ inputValue, setInputValue ] = useState('')
  const [ show, setShow ] = useState(false)

  useEffect(()=>{
    const v = model.params.filter(param => param.value === value)
    if(showMode) {
      if(v.length) setInputValue(v[0].value)
      else setInputValue(model.params[0].value)
    } 
  }, [model.params, showMode, value])
  
  return showMode ?
  (<ListView  name={model.name}>{util_getValueOfLabel(inputValue, model.params)}</ListView>) :
  (
    <>
      <WhiteSpace/>
      <InputItem 
        labelNumber={model.name.length < 5 ? 5 : model.name.length}
        value={inputValue}
        extra={(<Icon type="right"/>)}
        onExtraClick={() => {setShow(!show)}}
        editable={0}
      >{model.name}</InputItem>
      {show ? 
        (<Menu
          className={styles.single_foo_menu}
          data={model.params}
          value={inputValue}
          level={1}
          height={document.documentElement.clientHeight * 0.6}
          onChange={v => {
            setShow(false)
            setInputValue(v[0])
            cb(v[0])
          }}
          ></Menu>):
        null
      }
      <WhiteSpace/>
    </>
  )
}