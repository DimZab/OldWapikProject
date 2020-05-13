describe("hamburger", function() {

  it("click-state", function() {
    if (window.innerWidth < 1000) {
      const prevState = hamburgerAction.isOpen;
      hamburgerAction.click();
      const state = hamburgerAction.isOpen;
      assert.equal(prevState, state);
    }
  });

});


describe("callback-form", function() {

  it("open", function() {
  	callbackAction.open();
    assert.equal(callbackAction.nameField, '');
    assert.equal(callbackAction.phoneField, '');
    assert.equal(callbackAction.adressField, '');
    assert.equal(document.getElementById('popup').style.opacity, 1);
  });

  it("close", function() {
    callbackAction.close();
    assert.equal(document.getElementById('popup').style.opacity, 0);
  });

});
