import styles from './index.less';
import Footer from '@/components/globel/Footer/index'
import { FOOTERBAR_SHOW } from '@/config'
function BasicLayout(props) {
  // 处理显示footerbar的页面
  if ( FOOTERBAR_SHOW.indexOf(props.location.pathname) !== -1) {
    return (
      <div className={styles.normal}>
        <div className={styles.native_header}></div>
        {props.children}
        <Footer pathname={props.location.pathname}/>
      </div>
    )
  }
  return (
    <div className={styles.normal}>
      <div className={styles.native_header}></div>
      {props.children}
    </div>
  );
}

export default BasicLayout;
