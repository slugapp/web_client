var expect = chai.expect;

var test_div = document.getElementById("test_div");

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

  it('has correct initial view', function() {
    var model = newEventListModel(newMockEventsApi());
    var view = newEventListView();
    var controller = newEventListController(model, view);
    test_div.appendChild(view.root);

    expect(test_div.innerHTML).to.equal("<ul></ul>");
  });

  it('correctly updates view on model changes', function() {
    testCases = [
        {
          events: [
            {name: "a", summary: "b"},
            {name: "c", summary: "d"},
          ],
          expected: "<ul>" +
            "<li>a</li>" +
            "<li>b</li>" +
            "<li>c</li>" +
            "<li>d</li>" +
            "</ul>",
        },
        {
          events: [
            {name: "a", summary: "b"},
          ],
          expected: "<ul>" +
            "<li>a</li>" +
            "<li>b</li>" +
            "</ul>",
        },
        {
          events: [
            {name: "e", summary: "f"},
          ],
          expected: "<ul>" +
            "<li>e</li>" +
            "<li>f</li>" +
            "</ul>",
        },
        {
          events: [],
          expected: "<ul></ul>",
        }
      ];
  
    var mockApi = newMockEventsApi();
    var model = newEventListModel(mockApi);
    var view = newEventListView();
    var controller = newEventListController(model, view);
    test_div.appendChild(view.root);

    _.each(testCases, function(testCase) {
        mockApi.setEvents(testCase.events);
        model.update();
        expect(test_div.innerHTML).to.equal(testCase.expected);
      });
  });

  afterEach(function() {
    test_div.innerHTML = "";
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
