const newPage = require('./page')
const logger = require('./logger')

module.exports = async (browser, email, password) => {
	const url = 'https://www.linkedin.com/login'
	const page = await newPage({ browser, url })
	logger.info('login', `logging at: ${url}`)

	await page.goto(url)
	await page.waitFor('#username')

	await page.$('#username')
		.then((emailElement) => emailElement.type(email))
	await page.$('#password')
		.then((passwordElement) => passwordElement.type(password))

	await page.$x("//button[contains(text(), 'Sign in')]")
		.then((button) => button[0].click())

	return page.waitFor('input[role=combobox]', {
		timeout: 15000
	})
		.then(async () => {
			logger.info('login', 'logged feed page selector found')
			await page.close()
		})
		.catch(async () => {
			logger.error('login', 'something went wrong')
			return Promise.reject(new Error('something went wrong'));
		})
}