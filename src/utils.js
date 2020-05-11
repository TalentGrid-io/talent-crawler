const logger = require("./logger");
const seeMoreButtons = [
	{
		id: "SHOW_MORE_SECTIONS",
		selector: "button.pv-profile-section__card-action-bar",
		count: 1,
	},
	{
		id: "SHOW_MORE_EXPERIENCES",
		selector: "button.pv-profile-section__see-more-inline",
		count: 3,
	},
	{
		id: "SEE_MORE_EXPERIENCE_DESCRIPTION",
		selector: ".lt-line-clamp__more",
		count: 1,
	},
];

const clickSeeMoreButtons = async (page) => {
	for (let i = 0; i < seeMoreButtons.length; i++) {
		const button = seeMoreButtons[i];
		const elems = await page.$$(button.selector);

		for (let j = 0; j < button.count; j++) {
			elems.map(async (elem) => {
				if (elem) {
					await elem.click().catch((e) => {
						throw new Error(e);
					});
				}
			});

			if (button.count > 1) {
				await new Promise((resolve) => {
					setTimeout(() => {
						resolve();
					}, 100);
				});
			}
		}
	}

	return;
};

module.exports = { clickSeeMoreButtons };
