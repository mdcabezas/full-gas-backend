const queryReport = async (req, res, next) => {
    console.log(`
    Date: ${new Intl.DateTimeFormat('es-CL', { dateStyle: 'full', timeStyle: 'long', timeZone: 'America/Santiago' }).format(Date.now())}
    Url: ${req.url}
    Parameters: ${JSON.stringify(req.params)}
    Headers: ${JSON.stringify(req.headers)}
    Body: ${JSON.stringify(req.body)}
    `)
    next()
}

module.exports = { queryReport };