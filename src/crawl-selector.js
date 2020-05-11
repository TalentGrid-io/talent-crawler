const crawlSelectorFields = (selector, section) => async (crawledObjectPromise, fieldKey) => {
	const crawledObject = await crawledObjectPromise
	const field = section.fields[fieldKey]
	const fieldSelectorString = await field.selector
		? field.selector
		: field

	const isFieldPresent = await selector.$(fieldSelectorString)

	if (!isFieldPresent) { return crawledObject }

	if (field.isMultipleFields) {
		crawledObject[fieldKey] = await selector.$$eval(fieldSelectorString, (elems) => elems.map(elem => elem.innerText.trim()))
	} else if (field.hasChildrenFields) {
		const fieldChildrenSelectors = await selector.$$(field.selector)

		crawledObject[fieldKey] = await Promise.all(
			fieldChildrenSelectors.map((s) => crawlSelector(s, field))
		)
	} else if (field.attribute && field.attribute === 'href') {
		crawledObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.href.trim() : '')
	} else if (field.attribute && field.attribute === 'src') {
		crawledObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.src.trim() : '')
	} else {
		crawledObject[fieldKey] = await selector.$eval(fieldSelectorString, (elem) => elem ? elem.innerText.trim() : '')
	}

	return crawledObject
}
const crawlSelector = (selector, section) =>
	Object.keys(section.fields)
		.reduce(crawlSelectorFields(selector, section), Promise.resolve({}))

module.exports = async (page, section) => {
	const sectionSelectors = await page.$$(section.selector)

	const crawledPromises = sectionSelectors
		.map((selector) => crawlSelector(selector, section))

	return Promise.all(crawledPromises)
}
