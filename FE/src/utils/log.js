const log = console.log.bind(console, '>>>')

log.err = console.error.bind(console)

export default log