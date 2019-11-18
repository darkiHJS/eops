import { useState, useEffect } from 'react'
import { local_get } from '@/utils/index'
import { USER_INFO_ID } from '@/config'
import { router } from 'umi'
import { WhiteSpace, Button, Flex } from 'antd-mobile'


export default (props) => {
  console.log(props)
  const { isreceived, executors, orderSetExecutor, toHandleOrder } = props
  const userId = local_get(USER_INFO_ID).userId

  const [isShowHandle, setIsShowHandle] = useState(false)
  useEffect(() => {
    executors.indexOf(userId) !== -1 && setIsShowHandle(true)
  }, [executors])
  return isShowHandle ?
    (
      <>
        {isreceived === 1 ?

          <Flex>
            <Flex.Item>
              <Button type="primary" onClick={() => {
                orderSetExecutor(() => {
                  toHandleOrder()
                })
              }}>接单并处理</Button>
            </Flex.Item>
            <Flex.Item>
              <Button type="primary" onClick={() => {
                orderSetExecutor(() => {
                  router.push('/order')
                })
              }}>接单不处理</Button>
            </Flex.Item>
          </Flex> :
          <Button
              type="primary"
              onClick={() => {
                toHandleOrder()
              }}>处理工单</Button>
            }
        <WhiteSpace size="sm" />
      </>
    ) : null
}