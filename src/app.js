const puppeteer = require("puppeteer");
const login = require("./login");
const profile = require("./profile");
const config = require("../config.json");

const { profiles, email, password } = config;
const puppeteerOptions = {
	headless: false,
	args: ["--no-sandbox"],
};

const startCrawling = async () => {
	const browser = await puppeteer.launch(puppeteerOptions);

	try {
		await login(browser, email, password);
		if (profiles.length <= 0) {
			throw new Error("no profiles found");
		}
		profiles.forEach(async (profileUrl) => {
			await profile({ profileUrl, browser });
		});
	} catch (error) {
		await browser.close();
		throw error;
	}
};

startCrawling();
