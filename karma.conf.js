module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage')
    ],
    client: { jasmine: { random: false } },
    reporters: ['progress', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    restartOnFileChange: true,
    coverageReporter: { dir: require('path').join(__dirname, './coverage/employee-management-app'), reporters: [{type: 'html'}, {type: 'text-summary'}] }
  });
};