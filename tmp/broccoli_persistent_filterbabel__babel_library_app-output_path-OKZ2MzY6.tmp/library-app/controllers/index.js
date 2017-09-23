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
				var email = this.get('emailAddress');

				var newInvitation = this.store.createRecord('invitation', {
					email: email
				});

				newInvitation.save();

				this.set('responseMessage', 'Thank you! We saved your email address: ' + response.get('emailAddress'));
				this.set('emailAddress', '');
			}
		}
	});
});