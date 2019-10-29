import { useState, useEffect } from 'react'
import styles from './ListView.less'
import { Row, Col } from 'antd';

export default (props) => {
  const { name, children } = props
  const [isLong, setIsLong] = useState(false)

  useEffect(() => {
    if (children.length < 12) setIsLong(true)
  }, [])
  return (
    <div className={styles.list_view}>
      <Row className={styles.list_view_body}>
        <Col span={6}>
          <div className={styles.title}>
            {name}
          </div></Col>
        <Col span={18}>
          <div className={styles.content}>{children}</div>
        </Col>
      </Row>
      <div >

        <span></span>

      </div>
    </div>
  )
}