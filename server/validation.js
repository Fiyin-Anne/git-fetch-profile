// validate and trim string
const validateName = (req, res, next) => {
    try {
        if(req.query.user) {
            req.query.user = req.query.user.trim();
            return next();
        }
        return res.status(400).json({ status: 'error', message: 'Please enter a name.' });
    } catch (e) {
        return res.status(500).json({ status: 'error', message: 'Server Error.' });
    }
}

module.exports = {
    validateName
}