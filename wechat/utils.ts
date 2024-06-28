import dayjs from 'dayjs'
import axios from 'axios'

export function calculateAge(birthDate: string | number | dayjs.Dayjs) {
  const now = dayjs()
  const birth = dayjs(birthDate)

  if (birth.isAfter(now)) {
    return '未出生'
  }

  const years = now.diff(birth, 'year')
  const updatedBirthDate = birth.add(years, 'years')

  const months = now.diff(updatedBirthDate, 'month')
  const updatedBirthDateWithMonths = updatedBirthDate.add(months, 'months')

  const days = now.diff(updatedBirthDateWithMonths, 'day')

  if (years > 0) {
    return `${years}岁${months}个月${days}`
  } else if (months > 0) {
    return `${months}个月${days}`
  } else {
    return `${days}`
  }
}

export async function getHitokoto() {
  const URL = `https://v1.hitokoto.cn?max_length=20`
  console.log(URL)

  try {
    const response = await axios.get(URL)
    console.log('getHitokoto', response.data.hitokoto)
    if (response.data.hitokoto) return response.data.hitokoto
    return false
  } catch (error) {
    return false
  }
}
