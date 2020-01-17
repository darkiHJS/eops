import { createConstStorageKey } from '@/utils/index'

/**
 * 工单相关 浏览器key
 * SUNGCOR_STORAGE_SAVE_WORLD_order_state
 */
export const ORDER_STATE_SL_KEY = createConstStorageKey('order_state')



// 缺省用户model_id
export const USER_INFO_ID = 'sungcor_ds2d2_dnsadnjnfdjn_e10adc3949ba59abbe56e057f2gg88dd'

/**
 * @const  
 * 测试环境的Api 接口
 */
// export const BASEURL = 'http://itsm.sungcor.com:38020'
export const BASEURL = 'http://192.168.3.204:8020'

//显示footerBar的页面
export const FOOTERBAR_SHOW = ['/', '/order', '/user','/rmon' , '/device']

/**
 * 配置工单配置项
 * @param {String} ordername
 * @return {Object} img
 */
export const ORDER_MODEL_IMG = {
  '视频报修test': require('@/assets/imgs/order/camera.jpg'),
  '视频报修流程': require('@/assets/imgs/order/camera.jpg'),
  'PC报修test': require('@/assets/imgs/order/pc.jpg'),
  'default': require('@/assets/imgs/order/order_default.png'),
}

// 设备搜索配置
export const DEVICE_SEARCH = (key) => {
  const option = {
    normal: [
      { name: '资产名称', key: 'name', prompt: '输入资产名搜索相关内容。' },
      { name: '设备编号', key: 'name', prompt: '输入资产编号搜索相关内容。' },
      { name: '设备IP', key: 'IP', prompt: '输入完整设备IP检索对应设备。' },
      { name: '键盘编码', key: 'handelKey', prompt: '输入完整设备键盘编码检索对应设备。' },
    ]
  }
  return option[key]
}