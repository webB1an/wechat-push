import axios from 'axios'

export async function getAccessToken() {
  const APP_ID = process.env.APP_ID
  const APP_SECRET = process.env.APP_SECRET
  const URL = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`
  console.log(URL)

  try {
    const response = await axios.get(URL)
    console.log('getAccessToken', response.data)
    if (response.data.access_token) return response.data.access_token
    return false
  } catch (error) {
    return false
  }
}
