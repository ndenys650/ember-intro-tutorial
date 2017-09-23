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