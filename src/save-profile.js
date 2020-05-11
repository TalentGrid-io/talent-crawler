const fs = require('fs')

module.exports = async ({ content }) => {

	const getLastFiveObject = (arr) => {
		return arr.slice(0, 5);
	}

	const {
		positions,
		educations,
		profileAlternative,
		skills
	} = content;

	const mappedContent = {
		profileAlternative,
		positions: getLastFiveObject(positions),
		educations,
		skills: getLastFiveObject(skills)
	}


	fs.readFile(`saved-profiles/data.json`, function (err, data) {
		if (err) throw err

		let profileArr = JSON.parse(data)
		profileArr.push(mappedContent)

		fs.writeFile(`saved-profiles/data.json`, JSON.stringify(profileArr), undefined, function (err) {
			if (err) throw err
			console.log('Done!')
		})
	})
}
