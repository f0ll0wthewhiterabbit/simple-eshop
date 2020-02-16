/* eslint-disable no-undef */

describe('Simple eShop (e2e)', () => {
  jest.setTimeout(200000)

  beforeEach(async () => {
    await page.goto('http://localhost:3000/')
  })

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.removeItem('accessToken')
    })
  })

  describe('sing in', () => {
    it('should be titled "simple eShop"', async () => {
      await expect(page.title()).resolves.toMatch('simple eShop')
    })

    it('should sign in"', async () => {
      await page.waitFor('#email')
      await page.waitFor('#password')
      await page.type('#email', 'user@g.com')
      await page.type('#password', '123456')
      await page.click('button[type="submit"]')
      await page.waitForNavigation({ waitUntil: 'load' })
      await page.waitFor('main h1')
      const headingText = await page.$eval('main h1', heading => heading.textContent)

      expect(page.url()).toBe('http://localhost:3000/')
      expect(headingText).toBe('Simpleshop.')
    })
  })

  describe('authorized', () => {
    beforeEach(async () => {
      await page.reload()
      await page.waitFor('#email')
      await page.waitFor('#password')
      await page.type('#email', 'user@g.com')
      await page.type('#password', '123456')
      await page.click('button[type="submit"]')
      await page.waitForNavigation({ waitUntil: 'load' })
    })

    it('should open profile page', async () => {
      await page.waitFor('button[data-test="menuButton"]')
      await page.click('button[data-test="menuButton"]')
      await page.waitForSelector('#simple-menu .MuiPaper-root', { visible: true })
      await page.click('a[data-test="profileButton"]')
      await page.waitFor('main h1')
      const headingText = await page.$eval('main h1', heading => heading.textContent)

      expect(page.url()).toBe('http://localhost:3000/profile')
      expect(headingText).toBe('Profile')
    })

    it('should open catalog page', async () => {
      await page.waitFor('main a[href="/catalog"]')
      await page.click('main a[href="/catalog"]')
      await page.waitFor('main h1')
      const headingText = await page.$eval('main h1', heading => heading.textContent)

      expect(page.url()).toBe('http://localhost:3000/catalog')
      expect(headingText).toBe('Catalog.')
    })

    it('should sign out', async () => {
      await page.waitFor('button[data-test="signOutButton"]')
      await page.click('button[data-test="signOutButton"]')
      await page.waitFor('main h1')
      const headingText = await page.$eval('main h1', heading => heading.textContent)

      expect(page.url()).toBe('http://localhost:3000/sign-in')
      expect(headingText).toBe('Sign in')
    })
  })
})
