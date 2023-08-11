import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import axios from 'axios'

const koa = new Koa()
const router = new Router()

router.post('/token', async ctx => {
  const { data } = await axios.post("https://asr.api.yating.tw/v1/token", {
    // https://developer.yating.tw/doc/asr-%E5%8D%B3%E6%99%82%E8%AA%9E%E9%9F%B3%E8%BD%89%E6%96%87%E5%AD%97#%E8%AA%9E%E8%A8%80%E6%A8%A1%E5%9E%8B%E4%BB%A3%E7%A2%BC
    pipeline: "asr-zh-en-std",
  }, {
    headers: {
      key: process.env.API_KEY
    }
  }).catch(e => { console.log(e.response.data); throw e });
  if (!data.success) {
    throw new Error("get token failed")
  }
  ctx.body = {
    token: data.auth_token
  }
})

koa.use(cors({
  origin: "*"
}))
koa.use(router.routes())
koa.listen(3010, () => {
  console.log('server started')
})