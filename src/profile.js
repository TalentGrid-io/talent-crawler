const newPage = require('./page')
const crawlSelector = require('./crawl-selector')
const utils = require('./utils')
const template = require('./profile-skeleton')
const saveProfile = require('./save-profile')

const logger = require('./logger')

module.exports = async ({ browser, profileUrl }) => {
	logger.info('profile', `${profileUrl}`)

	const page = await newPage({ browser, url: profileUrl })
	const profilePageIndicatorSelector = '.pv-profile-section'
	await page.waitFor(profilePageIndicatorSelector, { timeout: 5000 })
		.catch(() => {
			logger.warn('profile', 'profile was not found')
		})
	await page.evaluate(() => window.scrollBy(0, window.innerHeight));
	await utils.clickSeeMoreButtons(page)
	const [profileLegacy] = await crawlSelector(page, template.profileLegacy)
	const [profileAlternative] = await crawlSelector(page, template.profileAlternative)
	const positions = await crawlSelector(page, template.positions)
	const educations = await crawlSelector(page, template.educations)
	const skills = await crawlSelector(page, template.skills)

	await page.close()
	logger.info('profile', `finished: ${profileUrl}`)

	const rawProfile = {
		profileLegacy,
		profileAlternative,
		positions,
		educations,
		skills
	}
	await saveProfile({ content: rawProfile })
	return profile
}
