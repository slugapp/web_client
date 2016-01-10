function newObservable() {
  /**
   * @var Observer[] The list of observers that will be notified on a notify()
   * call.
   */
  var observers = [];

  /**
   * Adds the provided observer to the notify list. The observer must
`  * have an update() method.
   */
  function attach(observer) {
    observers.push(observer);
  }

  /**
   * Removes the provided observer from the notify list.
   */
  function detach(observer) {
    // Removes observer from the observers array.
    // TODO(simba) refactor this into an array utils
    var idx = observers.indexOf(observer);
    if(idx > -1) {
      observers.splice(idx, 1);
    }
  }

  /**
   * Notifies all the observers by calling update() on each of them.
   */
  function notify() {
    _.each(observers, function(observer) {
      observer.update();
    });
  }

  return {
    attach: attach,
    detach: detach,
    notify: notify,
  };
}
