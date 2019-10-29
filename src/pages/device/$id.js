import { useState, useEffect } from 'react'
import { queryDeviceById } from '@/request/request'

import { WingBlank, WhiteSpace, Toast, Card, List } from 'antd-mobile'
import HeaderNormal from '@/components/globel/HeaderNormal'

const Item = List.Item;
const Brief = Item.Brief;

export default (props) => {
  const { match } = props
  const [device, setDevice] = useState({})

  useEffect(() => {
    queryDeviceById(match.params.id)
      .then((d) => {
        setDevice(d)
      })
  }, [])

  return (
    <div>
      <HeaderNormal title="设备详情" />
      <WhiteSpace />
      <WingBlank>
        <Card>
          <Card.Header
            title={device.className}
            extra={device.cameraState}
          />
          <Card.Body>
            <Item>设备名:<Brief>{device.name}</Brief></Item>
            <Item>设备ID:<Brief>{device.serialNumber}</Brief></Item>
            <Item>联网IP:<Brief>{device.ip}</Brief></Item>
            <Item>管理机构:<Brief>{device.managementUnit}</Brief></Item>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>
      </WingBlank>

    </div>
  )
}