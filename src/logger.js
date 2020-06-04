const winston = require('winston')
const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.splat(),
		winston.format.simple(),
		winston.format.timestamp(),
		winston.format.colorize(),
		winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
	),
	transports: [new winston.transports.Console()]
})

const loggerWrapper = {
	info: (file, message) => logger.info(`[${file}] ${message}`),
	warn: (file, message) => logger.warn(`[${file}] ${message}`),
	error: (file, message, error) => logger.error(`[${file}] ${message}${error && error.stack ? error.stack : (error || '')}`),
	stopLogging: () => {
		logger.silent = true
	}
}

module.exports = loggerWrapper
