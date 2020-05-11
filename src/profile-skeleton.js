const _profile_selector = '.core-rail > *:first-child section >'

module.exports = {
	profileLegacy: {
		selector: '.pv-content .pv-top-card-section',
		fields: {
			name: `.pv-top-card-section__name`,
			headline: `.pv-top-card-section__headline`,
			location: `.pv-top-card-section__location`,
			connections: `.pv-top-card-v2-section__connections`
		}
	},
	profileAlternative: {
		selector: '.pv-content',
		fields: {
			name: `${_profile_selector} div:last-child > div:nth-child(2) > div:first-child ul:first-child > li:first-child`,
			headline: `${_profile_selector} div:last-child h2`,
			imageurl: {
				selector: `${_profile_selector} div:last-child > div:first-child > div:first-child [src^="https"]`,
				attribute: 'src'
			},
			location: `${_profile_selector} div:last-child > div:last-child > div:first-child ul:last-child > li:first-child`,
			connections: `${_profile_selector} div:last-child > div:last-child > div:first-child ul:last-child > li:nth-child(2)`
		}
	},
	aboutLegacy: {
		selector: '.pv-top-card-section__summary',
		fields: {
			text: '.pv-top-card-section__summary-text'
		}
	},
	aboutAlternative: {
		selector: '.pv-about-section',
		fields: {
			text: 'p'
		}
	},
	positions: {
		selector: 'section[id=experience-section] li.pv-profile-section__list-item',
		fields: {
			title: 'h3',
			link: {
				selector: 'a',
				attribute: 'href',
			},
			url: {
				selector: 'a',
				attribute: 'href'
			},
			companyName: '.pv-entity__secondary-title',
			location: '.pv-entity__location span:last-child',
			description: '.pv-entity__description',
			date1: '.pv-entity__date-range span:last-child',
			date2: '.pv-entity__bullet-item-v2',
			roles: {
				selector: '.pv-entity__role-details',
				hasChildrenFields: true,
				fields: {
					title: 'h3 span:last-child',
					description: '.pv-entity__description',
					date1: '.pv-entity__date-range span:last-child',
					date2: '.pv-entity__bullet-item-v2',
					location: '.pv-entity__location span:last-child'
				}
			}
		}
	},
	educations: {
		selector: 'section[id=education-section] li',
		fields: {
			title: 'h3',
			degree: 'span[class=pv-entity__comma-item]',
			url: {
				selector: 'a',
				attribute: 'href'
			},
			fieldOfStudy: 'p.pv-entity__fos span:nth-child(2)',
			date1: '.pv-entity__dates time:nth-child(1)',
			date2: '.pv-entity__dates time:nth-child(2)'
		}
	},
	skills: {
		selector: '.pv-skill-category-entity__skill-wrapper',
		fields: {
			title: '.pv-skill-category-entity__name-text',
			count: '.pv-skill-category-entity__endorsement-count'
		}
	}
}