import { useState, useEffect } from 'react'
import { InputItem, Modal, List, Button, WhiteSpace, Icon } from 'antd-mobile';
import ListView from './ListView'

const Item = List.Item;
const Brief = Item.Brief;

export default ({model, value, cb, showMode }) => {
  const [ showValue, setShowValue ] = useState(model.params[typeof value === 'number' ? value - 1 : 0].label)
  const [ popup, setPopup ] = useState(false)

  useEffect(() => {
    if(value === '') {
      const def = model.params.filter((e) => e.select === 1)
      if(def.length) {
        cb(def[0].value)
        setShowValue(def[0].label)
      }
    }
  }, [])

  return showMode ?
    (<ListView  name={model.name}>{showValue}</ListView>): 
    (
    <>
      <InputItem
        labelNumber={model.name.length < 5 ? 5 : model.name.length}
        value={ showValue }
        editable={0}
        extra={(<Icon type="right"/>)}
        onClick={() => {
          setPopup(true)
        }}
      >{model.name}</InputItem>
      <Modal
        popup
        visible={popup}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>选择{model.name}</div>} className="popup-list">
          {model.params.map((param) => {
            return (
              <div key={param.label}>
                <Button
                  onClick={() => {
                    setPopup(false)
                    cb(param.value)
                    setShowValue(model.params[param.value - 1].label)
                  }}
                >{param.label}</Button>
                <WhiteSpace size="xs"/>
              </div>
            )
          })}
        </List>
      </Modal>
    </>
  )
}