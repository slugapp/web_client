var expect = chai.expect;

function newMockObserver() {
    var mock = {};
    mock.notified = false;

    mock.update = function() {
      mock.notified = true;
    }
    return mock;
}

describe('Event List', function() {
  function newMockEventsApi() {
    var events = null;

    function setEvents(value) {
      events = value;
    }

    function getEvents() {
      return events;
    }
    return {
      setEvents: setEvents,
      getEvents: getEvents,
    };
  }

  describe('Model', function() {
    it('has correct null state', function() {
      var model = newEventListModel(null);
      expect(model.getEvents()).to.deep.equal([]);
    });

    it('handles multiple updates correctly', function() {
      var firstEventUpdate = [
          {name: "a", summary: "b"},
          {name: "c", summary: "d"},
        ];

      var secondEventUpdate = [
          {name: "e", summary: "f"},
        ];
      var mockApi = newMockEventsApi();
      mockApi.setEvents(firstEventUpdate);

      var model = newEventListModel(mockApi);

      model.update();
      expect(model.getEvents()).to.deep.equal(firstEventUpdate);

      mockApi.setEvents(secondEventUpdate);
      model.update()
      expect(model.getEvents()).to.deep.equal(secondEventUpdate);
    });

    it('notifies observer on update', function() {
      var model = newEventListModel(newMockEventsApi());
      var observer = newMockObserver();
      model.attach(observer);
      model.update();
      expect(observer.notified).to.be.true;
    });
  });
});

describe('Observable', function() {
  it('should notify attached observers', function() {
      
    var observable = newObservable();

    var observer1 = newMockObserver();
    var observer2 = newMockObserver();

    observable.attach(observer1);
    observable.attach(observer2);

    observable.notify()

    expect(observer1.notified).to.be.true;
    expect(observer2.notified).to.be.true;
  });

});
