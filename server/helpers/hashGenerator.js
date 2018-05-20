const crypto = require('crypto');

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 * @returns {number} of length characters
 */
const genRandomString = (length) => {
	return crypto.randomBytes(Math.ceil(length / 2))
		.toString('hex') /** convert to hexadecimal format */
		.slice(0, length);   /** return required number of characters */
};

/**
* hash password with sha512.
* @function
* @param {string} password - List of required fields.
* @param {string} salt - Data to be validated.
* @returns {object} combine salt and password
*/
const sha512 = (password, salt) => {
	let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
	hash.update(password);
	let passwordHash = hash.digest('hex');
	return {
			salt,
			passwordHash
	};
};

module.exports = function(password, salt) {
    salt = typeof salt === 'undefined' ? genRandomString(16) : salt;
    return sha512(password, salt);
};
