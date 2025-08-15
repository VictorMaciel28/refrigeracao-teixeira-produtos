module.exports = {
    webpack: (config) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        '@': require('path').resolve(__dirname, 'src'),
      };
      return config;
    },
  };