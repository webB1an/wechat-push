import { CronJob } from 'cron'

import { wechat } from '../wechat'

export const job = new CronJob(
  '0 30 9 * * *', // cronTime
  function() {
    console.log('执行了')
    console.log(process.env.APP_ID)
    wechat()
  }, // onTick
  null, // onComplete
  false, // start
  'Asia/Shanghai' // timeZone
)
