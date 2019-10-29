import React from 'react'
import styles from './DeviceItem.less'

export default (props) => {
  const {device, routerTo=() => {}} = props
  const { cameraState } = device

  const stateList = {
    maintenance: { name: '维修', color: '#ff9903' },
    using: { name: '在用', color: '#9cc940'},
    demolish: { name: '拆除', color: '#f47265'}
  }

  const handleClick = () => {
    routerTo(device)
  }
  return (
    <div className={styles.device_item} onClick={handleClick}>
      <div className={styles.device_img}>
        <img src={require(`@/assets/imgs/order/${device.classCode.toLocaleLowerCase()}.jpg`)} />
      </div>
      <div className={styles.device_info}>
        <h3>{device.name} <span style={{float: 'right', color: stateList[cameraState].color}}>{stateList[cameraState].name}</span></h3>
        <p>{device.className} - {device.managementUnit}({device.ip})</p>
        <p>负责人: {device.projectMan} 联系电话：{device.projectManPhone} </p>
      </div>      
    </div>
  )
}