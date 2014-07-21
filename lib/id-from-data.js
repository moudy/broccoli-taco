var crypto = require('crypto');

module.exports = function (data) {
  if (data.filename) return data.filename;
  var md5 = crypto.createHash('md5');
  md5.update(JSON.stringify(data));
  return md5.digest('hex');
};
