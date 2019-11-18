import styles from './RibbonItem.less'
import { router } from 'umi'

export default (props) => {
  const {itemKey} = props

  const routerTo = (route) => {
    router.push(route)
  }
  
  return (
    <div className={styles.ribbon_fb}>
      <button onClick={() => { routerTo(itemKey.path) }}>{itemKey.icon || '/'}</button>
      <p>{itemKey.name || 'unknow'}</p>
    </div>
  )
}