const replace = require('@rollup/plugin-replace');
require('dotenv').config();

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      replace({
        'process.env.CHECKOUT_APP_URL': JSON.stringify(
          process.env.CHECKOUT_APP_URL
        ),
        'process.env.DOLA_IFRAME_SECRET': JSON.stringify(
          process.env.DOLA_IFRAME_SECRET
        ),
      })
    );
    return config;
  },
};
