QUnit.module('ESLint | app');

QUnit.test('adapters/application.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
});

QUnit.test('app.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'app.js should pass ESLint\n\n');
});

QUnit.test('controllers/index.js', function(assert) {
  assert.expect(1);
  assert.ok(false, 'controllers/index.js should pass ESLint\n\n14:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n15:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n17:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n18:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n19:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n21:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n22:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n23:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n23:77 - \'response\' is not defined. (no-undef)\n24:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)\n25:2 - Mixed spaces and tabs. (no-mixed-spaces-and-tabs)');
});

QUnit.test('models/contact.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/contact.js should pass ESLint\n\n');
});

QUnit.test('models/invitation.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'models/invitation.js should pass ESLint\n\n');
});

QUnit.test('resolver.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'resolver.js should pass ESLint\n\n');
});

QUnit.test('router.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'router.js should pass ESLint\n\n');
});

QUnit.test('routes/about.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/about.js should pass ESLint\n\n');
});

QUnit.test('routes/contact.js', function(assert) {
  assert.expect(1);
  assert.ok(true, 'routes/contact.js should pass ESLint\n\n');
});

