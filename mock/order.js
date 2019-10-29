import order_config from '@/order_config' 

export default {
  'GET /api/order_model_mixin':(req, res) => {
    return {
      req,
      res,
      order_config
    }
  }
}