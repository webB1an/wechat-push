import { getAccessToken } from './getAccessToken'
import axios from 'axios'
import dayjs from 'dayjs'

import { calculateAge, getHitokoto } from './utils'

export async function wechat() {
  const now = dayjs()
  const meetDate = dayjs(process.env.MEET_DATE)
  const cardDate = dayjs(process.env.CARD_DATE)
  const marryDate = dayjs(process.env.MARRY_DATE)
  const childDate = dayjs(process.env.CHILD_DATE)

  const hitokoto = await getHitokoto()
  const sentence = hitokoto || '一叶见秋起，半天卷云舒。'
  console.log('sentence', sentence)

  const token = await getAccessToken()
  const URL = `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${token}`
  const configs = [
    {
      id: process.env.PENTA_ID,
      templatdId: process.env.TEMPLATE_ID_PENTA
    },
    {
      id: process.env.JUNE_ID,
      templatdId: process.env.TEMPLATE_ID_JUNE
    }
  ]

  const meet = now.diff(meetDate, 'day') // 相识
  const card = now.diff(cardDate, 'day') // 领证
  const marry = now.diff(marryDate, 'day') // 结婚
  const child = now.diff(childDate, 'day') // 孩子

  const nowYear = dayjs().get('year')

  const meetMonth = dayjs(meetDate).get('month') + 1
  const meetDay = dayjs(meetDate).date()

  const cardMonth = dayjs(cardDate).get('month') + 1
  const cardDay = dayjs(cardDate).date()

  const marryMonth = dayjs(marryDate).get('month') + 1
  const marryDay = dayjs(marryDate).date()

  const childMonth = dayjs(childDate).get('month') + 1
  const childDay = dayjs(childDate).date()

  const meetExpect = dayjs(`${nowYear}-${meetMonth}-${meetDay}`)
  const meetInterval = meetExpect.isSame(now, 'day') ? 0 : (meetExpect.isAfter(now) ? meetExpect.diff(now, 'day') : dayjs(meetExpect.add(1, 'year')).diff(now, 'day'))

  const cardExpect = dayjs(`${nowYear}-${cardMonth}-${cardDay}`)
  const cardInterval = cardExpect.isSame(now, 'day') ? 0 : (cardExpect.isAfter(now) ? cardExpect.diff(now, 'day') : dayjs(cardExpect.add(1, 'year')).diff(now, 'day'))

  const marryExpect = dayjs(`${nowYear}-${marryMonth}-${marryDay}`)
  const marryInterval = marryExpect.isSame(now, 'day') ? 0 : (marryExpect.isAfter(now) ? marryExpect.diff(now, 'day') : dayjs(marryExpect.add(1, 'year')).diff(now, 'day'))

  const childExpect = dayjs(`${nowYear}-${childMonth}-${childDay}`)
  const childInterval = childExpect.isSame(now, 'day') ? 0 : (childExpect.isAfter(now) ? childExpect.diff(now, 'day') : dayjs(childExpect.add(1, 'year')).diff(now, 'day'))

  console.log('meet', meet)
  console.log('card', card)
  console.log('marry', marry)
  console.log('child', child)

  console.log('meetInterval', meetInterval)
  console.log('cardInterval', cardInterval)
  console.log('marryInterval', marryInterval)

  for (const config of configs) {
    const response = await axios.post(URL, {
      touser: config.id,
      template_id: config.templatdId,
      url: '',
      data: {
        meet: {
          value: meet
        },
        card: {
          value: card
        },
        marry: {
          value: marry
        },
        child: {
          // value: child
          value: calculateAge(childDate)
        },
        meetInterval: {
          value: meetInterval
        },
        cardInterval: {
          value: cardInterval
        },
        marryInterval: {
          value: marryInterval
        },
        childInterval: {
          value: childInterval
        },
        sentence: {
          value: sentence
        }
      }
    })
    console.log('推送结果：', response.data.errmsg)
    console.log('时间：', new Date())
  }
}
