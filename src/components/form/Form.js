import { useState, useEffect } from 'react'
import styles from './Form.less'

import order_custom_fn from '@/utils/order_custom_fn'

import SingleRowText from './components/SingleRowText'
import SingleSel from './components/SingleSel'
import ListSel from './components/ListSel'
import MultiRowText from './components/MultiRowText'
import Resource from './components/Resource'
import Department from './components/Department'
import DateTime from './components/DateTime'
import MultiSel from './components/MultiSel'

const Form = ({formModel, value, cb, showMode=false}) => {
  const [ show, setShow ] = useState(true)
  const execution = {
    "mixin_show": (isShow) => {setShow(isShow)},
    "mixin_defaultValve": (value) => { setDefaultValve(value)}
  }
  // 方法注册
  const setDefaultValve = (value) => {
    // 判断value是否是内置方法的key
    if(/^fn_/.test(value)) {
      let key = value.slice(3)
      cb(formModel.code, order_custom_fn[key]())
      return
    }
    cb(formModel.code, value)
  }
  const valueCellBack = (value) => {
    cb(formModel.code, value)
  }
  // 控件注册
  const cr = {
    "singleRowText" : SingleRowText,
    "singleSel": SingleSel,
    "listSel": ListSel,
    "multiRowText": MultiRowText,
    "resource": Resource,
    "attachfile": null,
    "department": Department,
    "dateTime": DateTime,
    'multiSel': MultiSel
  }

  useEffect(() => {
    const instruct = Object.keys(formModel)
    instruct.map(key => {
      if(execution[key]) execution[key](formModel[key])
    })
  }, [formModel])

  return (
    <div 
      style={{display: show ? 'block': 'none'}}
      className={styles.form}>
      {
        cr[formModel.type] ? 
        cr[formModel.type]({model: formModel, value, cb: valueCellBack, showMode}) : 
        null
      }
    </div>
  )
}

export default Form