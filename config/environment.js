/* eslint-env node */
'use strict';

module.exports = function(environment) {
  var ENV = {
      modulePrefix: 'library-app',
      environment: environment,
      baseURL: '/',
      locationType: 'auto',

      firebase: {
        apiKey: "AIzaSyCQ3Lwk2vtIoGIkZMbgE_KYo8X-ggvl2RM",
        authDomain: "library-app-7c689.firebaseapp.com",
        databaseURL: "https://library-app-7c689.firebaseio.com",
        projectId: "library-app-7c689",
        storageBucket: "",
        messagingSenderId: "784032461047"
      },

      // if using ember-cli-content-security-policy
      contentSecurityPolicy: {
        'script-src': "'self' 'unsafe-eval' apis.google.com",
        'frame-src': "'self' https://*.firebaseapp.com",
        'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com"
      },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }


// deploying app to firebase with faker data
  if (environment === 'production') {
      ENV['ember-faker'] = {
      enabled: true
    };
  }

  return ENV;
};
