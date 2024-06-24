import { CronJob } from 'cron'

export const job = new CronJob(
  '*/10 * * * * *', // cronTime
  function() {
    console.log('执行了')
    console.log(process.env.APP_ID)
  }, // onTick
  null, // onComplete
  false, // start
  'Asia/Shanghai' // timeZone
)