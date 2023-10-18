import Koa from 'koa'
import Router from 'koa-router'
import cors from '@koa/cors'
import axios from 'axios'
import { bodyParser } from '@koa/bodyparser'

const koa = new Koa()
const router = new Router()

router.post('/token', async ctx => {
  let requestBody: any
  if (!ctx.request.body || !ctx.request.body.s3CusModelKey) {
    console.log('not using cus lm')
    requestBody = {
      pipeline: "asr-zh-en-std",
    }
  } else {
    console.log(`using cus lm: ${ctx.request.body.s3CusModelKey}`)
    requestBody = {
      pipeline: "asr-zh-en-std",
      "options": {
        "s3CusModelKey": ctx.request.body.s3CusModelKey
      }
    }
  }
  const { data } = await axios.post("https://asr.api.yating.tw/v1/token", requestBody, {
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

koa.use(bodyParser());
koa.use(cors({
  origin: "*"
}))
koa.use(router.routes())
koa.listen(3010, () => {
  console.log('server started')
})