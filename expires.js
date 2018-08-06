/**
 * Create Express.js middleware to ensure Expires header is set on request.
 * Optionally set a maximum age in milliseconds for expiration.
 * @param {number} [maxage]
 * @returns {function}
 */
function expires(maxage=Infinity) {
    return (req, res, next) => {
        const expires = req.get("expires");

        if (!expires) {
            res.status(400).send("Must Expire");
        } else if (new Date(expires).getTime() - Date.now() > maxage) {
            res.status(400).send("Expiry Too Far-Off");
        } else {
            next();
        }
    };
}

module.exports = expires;
