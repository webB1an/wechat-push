import { CronJob } from 'cron'

import { wechat } from '../wechat'

export const job = new CronJob(
  '30 7 * * * *', // cronTime
  function() {
    console.log('执行了')
    console.log(process.env.APP_ID)
    wechat()
  }, // onTick
  null, // onComplete
  false, // start
  'Asia/Shanghai' // timeZone
)
