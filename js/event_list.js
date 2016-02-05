/**
 * Creates a new EventList model.
 * Takes an event API gateway as a parameter to retrieve current event data.
 */
function newEventListModel(eventApi) {
  /**
   * @var an array of the current events.
   */
  var events = [];

  /**
   * @const obs is an Observable. The Model uses it to allow other objects to
   * attach to it, and to notify attached observers when the Model's data has
   * changed.
   */
  var obs = newObservable();

  /**
   * Gets current events from the provided event API, and notifies observers
   * of the change.
   */
  function update() {
    events = eventApi.getEvents(updateEvents);
  }

  /**
   * Returns the current events
   */
  function getEvents() {
    return events;
  }

  function updateEvents(newEvents) {
    events = newEvents;
    obs.notify();
  }

  return {
      attach: obs.attach,
      getEvents: getEvents,
      update: update,
    };
}

/**
 * Connects the EventListModel to the EventListView.
 */
function newEventListController(model, view) {
  /**
   * @const The updater listens to changes to model then updates the view.
   */
  var updater = {};
  updater.update = function() {
    view.render(model.getEvents());
  };
  model.attach(updater);

  // Initializes model which in turn initializes the view.
  model.update();

  return {};
}

/**
 * Creates a new view for an EventList.
 */
function newEventListView() {
  // TODO(simba) catch events such as onclick.
  // TODO(simba) make view more generic
  /**
   * @const The root HTML element of this view.
   */
  var root = document.createElement("ul");

  /**
   * @const templator is a function which takes data in the form:
   * [ {name: <string>, value: <string>} ... ] and creates an HTML string out
   * of them.
   */
  var templator = doT.template(
      "{{~it :value:idx}}" +
      "<li>{{=value.name}}</li>" +
      "<li>{{=value.summary}}</li>" +
      "{{~}}"
    );

  /**
   * Updates the view to properly display the data provided.
   */
  function render(data) {
    root.innerHTML = templator(data);
  }

  return {
      root: root,
      render: render,
    };
}
