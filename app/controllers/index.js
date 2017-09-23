import Ember from 'ember';

export default Ember.Controller.extend({
	
	headerMessage: 'Coming Soon',
	responseMessage: '',
	emailAddress: '',

	isValid: Ember.computed.match('emailAddress', /^.+@.+\..+$/),
	isDisabled: Ember.computed.not('isValid'),

	actions: {

	  saveInvitation() {
	    const email = this.get('emailAddress');

	    const newInvitation = this.store.createRecord('invitation', {
	      email: email
	    });

	    newInvitation.save();
	    
	    this.set('responseMessage', `Thank you! We saved your email address: ${response.get('emailAddress')}`);
	    this.set('emailAddress', '');
	  }
	}
});
