const crypto = require('crypto');

const generateSecretKey = () => {
  const secret = crypto.randomBytes(32).toString('hex');
  console.log('Generated Secret Key:', secret);
};

generateSecretKey();
