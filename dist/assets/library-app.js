"use strict";



define('library-app/adapters/application', ['exports', 'emberfire/adapters/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default.extend({});
});
define('library-app/app', ['exports', 'library-app/resolver', 'ember-load-initializers', 'library-app/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('library-app/components/fader-label', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: 'span',

    classNames: ['label label-success label-fade'],
    classNameBindings: ['isShowing:label-show'],

    isShowing: false,

    isShowingChanged: Ember.observer('isShowing', function () {
      var _this = this;

      // User can navigate away from this page in less than 3 seconds, so this component will be destroyed,
      // however our "setTimeout" task try to run.
      // We save this task in a local variable, so it can be cleaned up during the destroy process.
      // Otherwise you will see a "calling set on destroyed object" error.
      this._runLater = Ember.run.later(function () {
        return _this.set('isShowing', false);
      }, 3000);
    }),

    resetRunLater: function resetRunLater() {
      this.set('isShowing', false);
      Ember.run.cancel(this._runLater);
    },
    willDestroy: function willDestroy() {
      this.resetRunLater();
      this._super.apply(this, arguments);
    }
  });
});
define('library-app/components/library-item-form', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({
		buttonLabel: 'Save',

		actions: {
			buttonClicked: function buttonClicked(param) {
				this.sendAction('action', param);
			}
		}
	});
});
define('library-app/components/library-item', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('library-app/components/nav-link-to', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.LinkComponent.extend({
		tagName: 'li'
	});
});
define('library-app/components/number-box', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Component.extend({

		classNames: ['panel', 'panel-warning']

	});
});
define('library-app/components/seeder-block', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var MAX_VALUE = 100;

  exports.default = Ember.Component.extend({

    counter: null,

    isCounterValid: Ember.computed.lte('counter', MAX_VALUE),
    isCounterNotValid: Ember.computed.not('isCounterValid'),
    placeholder: 'Max ' + MAX_VALUE,

    generateReady: false,
    deleteReady: false,

    generateInProgress: false,
    deleteInProgress: false,

    generateIsDisabled: Ember.computed.or('isCounterNotValid', 'generateInProgress', 'deleteInProgress'),
    deleteIsDisabled: Ember.computed.or('generateInProgress', 'deleteInProgress'),

    actions: {
      generateAction: function generateAction() {
        if (this.get('isCounterValid')) {

          // Action up to Seeder Controller with the requested amount
          this.sendAction('generateAction', this.get('counter'));
        }
      },
      deleteAction: function deleteAction() {
        this.sendAction('deleteAction');
      }
    }
  });
});
define('library-app/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('library-app/controllers/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({

    headerMessage: 'Coming Soon',
    responseMessage: '',
    emailAddress: '',

    isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
    isDisabled: Ember.computed.not('isValid'),

    actions: {
      saveInvitation: function saveInvitation() {
        var _this = this;

        var email = this.get('emailAddress');

        var newInvitation = this.store.createRecord('invitation', {
          email: email
        });

        newInvitation.save().then(function (response) {
          _this.set('responseMessage', 'Thank you! We saved your email address with the following id: ' + response.get('id'));
          _this.set('emailAddress', '');
        });
      }
    }

  });
});
define('library-app/helpers/app-version', ['exports', 'library-app/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('library-app/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('library-app/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('library-app/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'library-app/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _config$APP = _environment.default.APP,
      name = _config$APP.name,
      version = _config$APP.version;
  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('library-app/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('library-app/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('library-app/initializers/emberfire', ['exports', 'emberfire/initializers/emberfire'], function (exports, _emberfire) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberfire.default;
});
define('library-app/initializers/export-application-global', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('library-app/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('library-app/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("library-app/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('library-app/models/author', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    books: _emberData.default.hasMany('book')
  });
});
define('library-app/models/book', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    title: _emberData.default.attr('string'),
    releaseYear: _emberData.default.attr('date'),
    library: _emberData.default.belongsTo('library'),
    author: _emberData.default.belongsTo('author')
  });
});
define('library-app/models/contact', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({

    email: _emberData.default.attr('string'),
    message: _emberData.default.attr('string'),

    isValidEmail: Ember.computed.match('email', /^.+@.+\..+$/),
    isMessageEnoughLong: Ember.computed.gte('message.length', 5),

    isValid: Ember.computed.and('isValidEmail', 'isMessageEnoughLong'),
    isNotValid: Ember.computed.not('isValid')
  });
});
define('library-app/models/invitation', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    email: _emberData.default.attr('string')
  });
});
define('library-app/models/library', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    address: _emberData.default.attr('string'),
    phone: _emberData.default.attr('string'),

    books: _emberData.default.hasMany('book'),

    isValid: Ember.computed.notEmpty('name')
  });
});
define('library-app/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('library-app/router', ['exports', 'library-app/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType
  });

  Router.map(function () {
    this.route('about');
    this.route('contact');

    this.route('admin', function () {
      this.route('invitations');
      this.route('contacts');
      this.route('seeder');
    });

    this.route('libraries', function () {
      this.route('new');
      this.route('edit', { path: '/:library_id/edit' });
    });
  });

  exports.default = Router;
});
define('library-app/routes/about', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('library-app/routes/admin/invitations', ['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Ember.Route.extend({
		model: function model() {
			return this.store.findAll('invitation');
		}
	});
});
define('library-app/routes/admin/seeder', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return Ember.RSVP.hash({
        libraries: this.store.findAll('library'),
        books: this.store.findAll('book'),
        authors: this.store.findAll('author')
      });
    },
    setupController: function setupController(controller, model) {
      controller.set('libraries', model.libraries);
      controller.set('books', model.books);
      controller.set('authors', model.authors);

      this._super(controller, model);
    }
  });
});
define('library-app/routes/contact', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('library-app/routes/libraries/edit', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model(params) {
      return this.store.findRecord('library', params.library_id);
    },
    setupController: function setupController(controller, model) {
      this._super(controller, model);

      controller.set('title', 'Edit library');
      controller.set('buttonLabel', 'Save changes');
    },
    renderTemplate: function renderTemplate() {
      this.render('libraries/form');
    },


    actions: {
      saveLibrary: function saveLibrary(library) {
        var _this = this;

        library.save().then(function () {
          return _this.transitionTo('libraries');
        });
      },
      willTransition: function willTransition(transition) {
        var model = this.controller.get('model');

        if (model.get('hasDirtyAttributes')) {
          var confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");

          if (confirmation) {
            model.rollbackAttributes();
          } else {
            transition.abort();
          }
        }
      }
    }
  });
});
define('library-app/routes/libraries/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    model: function model() {
      return this.store.findAll('library');
    },


    actions: {
      deleteLibrary: function deleteLibrary(library) {
        var confirmation = confirm('Are you sure?');

        if (confirmation) {
          library.destroyRecord();
        }
      }
    }

  });
});
define('library-app/routes/libraries/new', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({

    model: function model() {
      return this.store.createRecord('library');
    },

    setupController: function setupController(controller, model) {
      this._super(controller, model);

      controller.set('title', 'Create a new library');
      controller.set('buttonLabel', 'Create');
    },

    renderTemplate: function renderTemplate() {
      this.render('libraries/form');
    },


    actions: {
      saveLibrary: function saveLibrary(newLibrary) {
        var _this = this;

        newLibrary.save().then(function () {
          return _this.transitionTo('libraries');
        });
      },
      willTransition: function willTransition() {
        var model = this.controller.get('model');

        if (model.get('isNew')) {
          model.destroyRecord();
        }
      }
    }
  });
});
define('library-app/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('library-app/services/firebase-app', ['exports', 'emberfire/services/firebase-app'], function (exports, _firebaseApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebaseApp.default;
});
define('library-app/services/firebase', ['exports', 'emberfire/services/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});
define("library-app/templates/about", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "2D95zSsf", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[7],[0,\"About Page\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/about.hbs" } });
});
define("library-app/templates/admin/contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "wQY8c0pU", "block": "{\"symbols\":[],\"statements\":[],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/contact.hbs" } });
});
define("library-app/templates/admin/invitations", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1hZas5s/", "block": "{\"symbols\":[\"invitation\"],\"statements\":[[6,\"h1\"],[7],[0,\"Invitations\"],[8],[0,\"\\n\\n\"],[6,\"table\"],[9,\"class\",\"table table-bordered table-striped\"],[7],[0,\"\\n  \"],[6,\"thead\"],[7],[0,\"\\n    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"ID\"],[8],[0,\"\\n      \"],[6,\"th\"],[7],[0,\"E-mail\"],[8],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n  \"],[6,\"tbody\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"tr\"],[7],[0,\"\\n      \"],[6,\"th\"],[7],[1,[19,1,[\"id\"]],false],[8],[0,\"\\n      \"],[6,\"td\"],[7],[1,[19,1,[\"email\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/invitations.hbs" } });
});
define("library-app/templates/admin/seeder", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zFkqwjJH", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[7],[0,\"Seeder, our Data Center\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n \"],[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[1,[25,\"number-box\",null,[[\"title\",\"number\"],[\"Libraries\",[19,0,[\"libraries\",\"length\"]]]]],false],[8],[0,\"\\n \"],[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[1,[25,\"number-box\",null,[[\"title\",\"number\"],[\"Authors\",[19,0,[\"authors\",\"length\"]]]]],false],[8],[0,\"\\n \"],[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[1,[25,\"number-box\",null,[[\"title\",\"number\"],[\"Books\",[19,0,[\"books\",\"length\"]]]]],false],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[25,\"seeder-block\",null,[[\"sectionTitle\",\"generateAction\",\"deleteAction\",\"generateReady\",\"deleteReady\",\"generateInProgress\",\"deleteInProgress\"],[\"Libraries\",\"generateLibraries\",\"deleteLibraries\",[19,0,[\"libDone\"]],[19,0,[\"libDelDone\"]],[19,0,[\"generateLibrariesInProgress\"]],[19,0,[\"deleteLibrariesInProgress\"]]]]],false],[0,\"\\n\\n\"],[1,[25,\"seeder-block\",null,[[\"sectionTitle\",\"generateAction\",\"deleteAction\",\"generateReady\",\"deleteReady\",\"generateInProgress\",\"deleteInProgress\"],[\"Authors with Books\",\"generateBooksAndAuthors\",\"deleteBooksAndAuthors\",[19,0,[\"authDone\"]],[19,0,[\"authDelDone\"]],[19,0,[\"generateBooksInProgress\"]],[19,0,[\"deleteBooksInProgress\"]]]]],false]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/admin/seeder.hbs" } });
});
define("library-app/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "0KfYcwmG", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"container\"],[7],[0,\"\\n\\t\"],[12,\"navbar\",[]],[0,\"\\n\\t\"],[1,[18,\"outlet\"],false],[0,\"\\n\"],[8]],\"hasEval\":true}", "meta": { "moduleName": "library-app/templates/application.hbs" } });
});
define("library-app/templates/components/fader-label", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DC63Pzht", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/fader-label.hbs" } });
});
define("library-app/templates/components/library-item-form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "5GecjWTi", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"form-horizontal\"],[7],[0,\"\\n    \"],[6,\"div\"],[10,\"class\",[26,[\"form-group has-feedback \",[25,\"if\",[[19,0,[\"item\",\"isValid\"]],\"has-success\"],null]]]],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Name*\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-10\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[19,0,[\"item\",\"name\"]],\"form-control\",\"The name of the Library\"]]],false],[0,\"\\n          \"],[4,\"if\",[[19,0,[\"item\",\"isValid\"]]],null,{\"statements\":[[6,\"span\"],[9,\"class\",\"glyphicon glyphicon-ok form-control-feedback\"],[7],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Address\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-10\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[19,0,[\"item\",\"address\"]],\"form-control\",\"The address of the Library\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n        \"],[6,\"label\"],[9,\"class\",\"col-sm-2 control-label\"],[7],[0,\"Phone\"],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-10\"],[7],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\"],[\"text\",[19,0,[\"item\",\"phone\"]],\"form-control\",\"The phone number of the Library\"]]],false],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"form-group\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"col-sm-offset-2 col-sm-10\"],[7],[0,\"\\n            \"],[6,\"button\"],[9,\"type\",\"submit\"],[9,\"class\",\"btn btn-default\"],[10,\"disabled\",[25,\"unless\",[[19,0,[\"item\",\"isValid\"]],true],null],null],[3,\"action\",[[19,0,[]],\"buttonClicked\",[19,0,[\"item\"]]]],[7],[1,[18,\"buttonLabel\"],false],[8],[0,\"\\n        \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/library-item-form.hbs" } });
});
define("library-app/templates/components/library-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Fa9AS1W9", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"div\"],[9,\"class\",\"panel panel-default library-item\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-heading\"],[7],[0,\"\\n        \"],[6,\"h3\"],[9,\"class\",\"panel-title\"],[7],[1,[20,[\"item\",\"name\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-body\"],[7],[0,\"\\n        \"],[6,\"p\"],[7],[0,\"Address: \"],[1,[20,[\"item\",\"address\"]],false],[8],[0,\"\\n        \"],[6,\"p\"],[7],[0,\"Phone: \"],[1,[20,[\"item\",\"phone\"]],false],[8],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"panel-footer text-right\"],[7],[0,\"\\n      \"],[11,1],[0,\"\\n    \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/library-item.hbs" } });
});
define("library-app/templates/components/nav-link-to", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "rTpFKqIO", "block": "{\"symbols\":[\"&default\"],\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[11,1],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/nav-link-to.hbs" } });
});
define("library-app/templates/components/number-box", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Dkswxssn", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"panel-heading\"],[7],[0,\"\\n  \"],[6,\"h3\"],[9,\"class\",\"text-center\"],[7],[1,[18,\"title\"],false],[8],[0,\"\\n  \"],[6,\"h1\"],[9,\"class\",\"text-center\"],[7],[1,[25,\"if\",[[19,0,[\"number\"]],[19,0,[\"number\"]],\"...\"],null],false],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/number-box.hbs" } });
});
define("library-app/templates/components/seeder-block", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qMGvEYHv", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"well well-sm extra-padding-bottom\"],[7],[0,\"\\n  \"],[6,\"h3\"],[7],[1,[18,\"sectionTitle\"],false],[8],[0,\"\\n  \\n  \"],[6,\"div\"],[9,\"class\",\"form-inline\"],[7],[0,\"\\n  \\n   \"],[6,\"div\"],[10,\"class\",[26,[\"form-group has-feedback \",[25,\"unless\",[[19,0,[\"isCounterValid\"]],\"has-error\"],null]]]],[7],[0,\"\\n     \"],[6,\"label\"],[9,\"class\",\"control-label\"],[7],[0,\"Number of new records:\"],[8],[0,\"\\n     \"],[1,[25,\"input\",null,[[\"value\",\"class\",\"placeholder\"],[[19,0,[\"counter\"]],\"form-control\",[19,0,[\"placeholder\"]]]]],false],[0,\"\\n   \"],[8],[0,\"\\n  \\n   \"],[6,\"button\"],[9,\"class\",\"btn btn-primary\"],[10,\"disabled\",[18,\"generateIsDisabled\"],null],[3,\"action\",[[19,0,[]],\"generateAction\"]],[7],[0,\"\\n\"],[4,\"if\",[[19,0,[\"generateInProgress\"]]],null,{\"statements\":[[0,\"       \"],[6,\"span\"],[9,\"class\",\"glyphicon glyphicon-refresh spinning\"],[7],[8],[0,\" Generating...\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"       Generate \"],[1,[18,\"sectionTitle\"],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"   \"],[8],[0,\"\\n   \"],[4,\"fader-label\",null,[[\"isShowing\"],[[19,0,[\"generateReady\"]]]],{\"statements\":[[0,\"Created!\"]],\"parameters\":[]},null],[0,\"\\n  \\n   \"],[6,\"button\"],[9,\"class\",\"btn btn-danger\"],[10,\"disabled\",[18,\"deleteIsDisabled\"],null],[3,\"action\",[[19,0,[]],\"deleteAction\"]],[7],[0,\"\\n\"],[4,\"if\",[[19,0,[\"deleteInProgress\"]]],null,{\"statements\":[[0,\"       \"],[6,\"span\"],[9,\"class\",\"glyphicon glyphicon-refresh spinning\"],[7],[8],[0,\" Deleting...\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"       Delete All \"],[1,[18,\"sectionTitle\"],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"   \"],[8],[0,\"\\n   \"],[4,\"fader-label\",null,[[\"isShowing\"],[[19,0,[\"deleteReady\"]]]],{\"statements\":[[0,\"Deleted!\"]],\"parameters\":[]},null],[0,\"\\n  \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/components/seeder-block.hbs" } });
});
define("library-app/templates/contact", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Cz5On4hE", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[6,\"h1\"],[7],[0,\"Contact Us!\"],[8],[0,\"\\n\\n\"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n\"],[6,\"p\"],[7],[0,\"Feel free to leave us a message if you have any questions!\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-md-6\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[19,0,[\"responseMessage\"]]],null,{\"statements\":[[0,\"\\n        \"],[6,\"br\"],[7],[8],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"alert alert-success\"],[7],[0,\"\\n            \"],[6,\"h4\"],[7],[0,\"Thank you! Your message is sent.\"],[8],[0,\"\\n            \"],[6,\"p\"],[7],[0,\"To: \"],[1,[20,[\"model\",\"email\"]],false],[8],[0,\"\\n            \"],[6,\"p\"],[7],[0,\"Message: \"],[1,[20,[\"model\",\"message\"]],false],[8],[0,\"\\n            \"],[6,\"p\"],[7],[0,\"Reference ID: \"],[1,[20,[\"model\",\"id\"]],false],[8],[0,\"\\n        \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"\\n        \"],[6,\"div\"],[10,\"class\",[26,[\"form-group has-feedback \",[25,\"if\",[[19,0,[\"model\",\"isValidEmail\"]],\"has-success\"],null]]]],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Your email address*:\"],[8],[0,\"\\n          \"],[1,[25,\"input\",null,[[\"type\",\"class\",\"placeholder\",\"value\",\"autofocus\"],[\"email\",\"form-control\",\"Your email address\",[19,0,[\"model\",\"email\"]],\"autofocus\"]]],false],[0,\"\\n          \"],[4,\"if\",[[19,0,[\"model\",\"isValidEmail\"]]],null,{\"statements\":[[6,\"span\"],[9,\"class\",\"glyphicon glyphicon-ok form-control-feedback\"],[7],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"div\"],[10,\"class\",[26,[\"form-group has-feedback \",[25,\"if\",[[19,0,[\"model\",\"isMessageEnoughLong\"]],\"has-success\"],null]]]],[7],[0,\"\\n            \"],[6,\"label\"],[7],[0,\"Your message*:\"],[8],[0,\"\\n          \"],[1,[25,\"textarea\",null,[[\"class\",\"placeholder\",\"rows\",\"value\"],[\"form-control\",\"Your message. (At least 5 characters.)\",\"5\",[19,0,[\"model\",\"message\"]]]]],false],[0,\"\\n          \"],[4,\"if\",[[19,0,[\"model\",\"isMessageEnoughLong\"]]],null,{\"statements\":[[6,\"span\"],[9,\"class\",\"glyphicon glyphicon-ok form-control-feedback\"],[7],[8]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"btn btn-success\"],[10,\"disabled\",[20,[\"model\",\"isNotValid\"]],null],[3,\"action\",[[19,0,[]],\"sendMessage\",[19,0,[\"model\"]]]],[7],[0,\"Send Message\"],[8],[0,\"\\n\\n\"]],\"parameters\":[]}],[0,\"\\n    \"],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/contact.hbs" } });
});
define("library-app/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "LPDSgIsI", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"jumbotron text-center\"],[7],[0,\"\\n  \"],[6,\"h1\"],[7],[0,\"Coming Soon\"],[8],[0,\"\\n\\n  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\\n  \"],[6,\"p\"],[7],[0,\"Don't miss our launch date, request an invitation now.\"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"form-horizontal form-group form-group-lg row\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-1 col-md-5 col-md-offset-2\"],[7],[0,\"\\n      \"],[1,[25,\"input\",null,[[\"type\",\"value\",\"class\",\"placeholder\",\"autofocus\"],[\"email\",[19,0,[\"emailAddress\"]],\"form-control\",\"Please type your e-mail address.\",\"autofocus\"]]],false],[0,\"\\n    \"],[8],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-4 col-md-3\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"class\",\"btn btn-primary btn-lg btn-block\"],[10,\"disabled\",[18,\"isDisabled\"],null],[3,\"action\",[[19,0,[]],\"saveInvitation\"]],[7],[0,\"Request invitation\"],[8],[0,\"    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\"],[4,\"if\",[[19,0,[\"responseMessage\"]]],null,{\"statements\":[[0,\"     \"],[6,\"div\"],[9,\"class\",\"alert alert-success\"],[7],[1,[18,\"responseMessage\"],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/index.hbs" } });
});
define("library-app/templates/libraries", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "O4LsxHdl", "block": "{\"symbols\":[],\"statements\":[[6,\"h1\"],[7],[0,\"Libraries\"],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"well\"],[7],[0,\"\\n  \"],[6,\"ul\"],[9,\"class\",\"nav nav-pills\"],[7],[0,\"\\n    \"],[4,\"link-to\",[\"libraries.index\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"List all\"],[8]],\"parameters\":[]},null],[0,\"\\n    \"],[4,\"link-to\",[\"libraries.new\"],[[\"tagName\"],[\"li\"]],{\"statements\":[[6,\"a\"],[9,\"href\",\"\"],[7],[0,\"Add new\"],[8]],\"parameters\":[]},null],[0,\"\\n  \"],[8],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/libraries.hbs" } });
});
define("library-app/templates/libraries/form", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "zDhgoXW/", "block": "{\"symbols\":[],\"statements\":[[6,\"h2\"],[7],[1,[18,\"title\"],false],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"col-md-6\"],[7],[0,\"\\n    \"],[1,[25,\"library-item-form\",null,[[\"item\",\"buttonLabel\",\"action\"],[[19,0,[\"model\"]],[19,0,[\"buttonLabel\"]],\"saveLibrary\"]]],false],[0,\"\\n  \"],[8],[0,\"\\n\\n  \"],[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[0,\"\\n\"],[4,\"library-item\",null,[[\"item\"],[[19,0,[\"model\"]]]],{\"statements\":[[0,\"      \"],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"  \"],[8],[0,\"\\n\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/libraries/form.hbs" } });
});
define("library-app/templates/libraries/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "UISFrUhd", "block": "{\"symbols\":[\"library\"],\"statements\":[[0,\"\\n\\n\"],[6,\"h2\"],[7],[0,\"List\"],[8],[0,\"\\n\"],[6,\"div\"],[9,\"class\",\"row\"],[7],[0,\"\\n\"],[4,\"each\",[[19,0,[\"model\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"col-md-4\"],[7],[0,\"\\n\"],[4,\"library-item\",null,[[\"item\"],[[19,1,[]]]],{\"statements\":[[0,\"        \"],[4,\"link-to\",[\"libraries.edit\",[19,1,[\"id\"]]],[[\"class\"],[\"btn btn-success btn-xs\"]],{\"statements\":[[0,\"Edit\"]],\"parameters\":[]},null],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"btn btn-danger btn-xs\"],[3,\"action\",[[19,0,[]],\"deleteLibrary\",[19,1,[]]]],[7],[0,\"Delete\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/libraries/index.hbs" } });
});
define("library-app/templates/navbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "B+Go3ZCk", "block": "{\"symbols\":[],\"statements\":[[6,\"nav\"],[9,\"class\",\"navbar navbar-inverse\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"container-fluid\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"navbar-header\"],[7],[0,\"\\n      \"],[6,\"button\"],[9,\"type\",\"button\"],[9,\"class\",\"navbar-toggle collapsed\"],[9,\"data-toggle\",\"collapse\"],[9,\"data-target\",\"#main-navbar\"],[7],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"sr-only\"],[7],[0,\"Toggle navigation\"],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n        \"],[6,\"span\"],[9,\"class\",\"icon-bar\"],[7],[8],[0,\"\\n      \"],[8],[0,\"\\n      \"],[4,\"link-to\",[\"index\"],[[\"class\"],[\"navbar-brand\"]],{\"statements\":[[0,\"Library App\"]],\"parameters\":[]},null],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"collapse navbar-collapse\"],[9,\"id\",\"main-navbar\"],[7],[0,\"\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav\"],[7],[0,\"\\n        \"],[4,\"nav-link-to\",[\"index\"],null,{\"statements\":[[0,\"Home\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"libraries\"],null,{\"statements\":[[0,\"Libraries\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"about\"],null,{\"statements\":[[0,\"About\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"nav-link-to\",[\"contact\"],null,{\"statements\":[[0,\"Contact\"]],\"parameters\":[]},null],[0,\"\\n      \"],[8],[0,\"\\n\\n      \"],[6,\"ul\"],[9,\"class\",\"nav navbar-nav navbar-right\"],[7],[0,\"\\n        \"],[6,\"li\"],[9,\"class\",\"dropdown\"],[7],[0,\"\\n          \"],[6,\"a\"],[9,\"class\",\"dropdown-toggle\"],[9,\"data-toggle\",\"dropdown\"],[9,\"role\",\"button\"],[9,\"aria-haspopup\",\"true\"],[9,\"aria-expanded\",\"false\"],[7],[0,\"\\n            Admin\"],[6,\"span\"],[9,\"class\",\"caret\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n          \"],[6,\"ul\"],[9,\"class\",\"dropdown-menu\"],[7],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.invitations\"],null,{\"statements\":[[0,\"Invitations\"]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.contacts\"],null,{\"statements\":[[0,\"Contacts\"]],\"parameters\":[]},null],[0,\"\\n            \"],[4,\"nav-link-to\",[\"admin.seeder\"],null,{\"statements\":[[0,\"Seeder\"]],\"parameters\":[]},null],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[2,\" /.navbar-collapse \"],[0,\"\\n  \"],[8],[2,\" /.container-fluid \"],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "library-app/templates/navbar.hbs" } });
});
define('library-app/torii-providers/firebase', ['exports', 'emberfire/torii-providers/firebase'], function (exports, _firebase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _firebase.default;
});


define('library-app/config/environment', ['ember'], function(Ember) {
  var prefix = 'library-app';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("library-app/app")["default"].create({"name":"library-app","version":"0.0.0+6ad52596"});
}
//# sourceMappingURL=library-app.map
