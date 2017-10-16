const puppeteer = require('puppeteer')

const DEBUG = (process.env.NODE_ENV !== 'production')
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3230.0 Safari/537.36'
const CAPTCHA_URL = 'https://www.google.com/recaptcha/api2/anchor'

const FIELDS = {
  firstName: '#FNAME',
  lastName: '#LNAME',
  address1: '#ADD1',
  address2: '#ADD2',
  city: '#CITY',
  state: '#STATE',
  zip: '#ZIP',
  preferredContactMethod: '#PCM',
  email: '#EMAIL',
  preferredPhone: '#PPHONE',
  cellPhone: '#CPHONE',
  userId: '#LOGIN',
  password: '#PASS',
  passwordConfirm: '#CPASS',
  securityQuestion: '#SQ',
  securityAnswer: '#SA'
}

exports.register = async function register (data) {
  const puppeteerOpts = (DEBUG) ? { devtools: true } : {}
  const browser = await puppeteer.launch(puppeteerOpts)
  const page = await browser.newPage()
  await page.setUserAgent(USER_AGENT)
  await page.goto('https://www.septakey.org')

  await page.click('#s_3_1_18_0')
  await page.waitForNavigation()
  page.$eval('#g-recaptcha-response', (el) => el.value = 'lol')

  const id = Math.floor(Math.random() * 9000) + 1000

  await page.type(FIELDS.firstName, data.firstName)
  await page.type(FIELDS.lastName, data.lastName)
  await page.type(FIELDS.address1, data.address1)
  if (data.address2) await page.type(FIELDS.address2, data.address2)
  await page.type(FIELDS.city, data.city)
  await page.select(FIELDS.state, data.state)
  await page.type(FIELDS.zip, data.zip)
  await page.select(FIELDS.preferredContactMethod, 'Email')
  await page.type(FIELDS.email, data.email)
  await page.select(FIELDS.preferredPhone, 'Cell')
  await page.type(FIELDS.cellPhone, data.cellPhone)
  await page.type(FIELDS.userId, data.userId)
  await page.type(FIELDS.password, data.password)
  await page.type(FIELDS.passwordConfirm, data.password)
  await page.select(FIELDS.securityQuestion, data.securityQuestion)
  await page.type(FIELDS.securityAnswer, data.securityAnswer)

  await page.click('#s_1_1_10_0') // next
  await page.waitForNavigation()
  await page.click('#s_2_1_4_0') // confirm
  await page.waitForNavigation()
  await page.click('#s_1_1_0_0') // accept terms
  await page.waitForNavigation()
  await page.click('#s_3_1_1_0') // submit
  await page.waitForNavigation()

  // await page.screenshot({path: 'screenshot.png', fullPage: true})
  await browser.close()
}
