function newEventApi() {
  function getEvents(fn) {
      $.ajax({
      type: 'GET',
      dataType: "json",
      url: "http://localhost:8080/event",
      success: function (responseData, textStatus, jqXHR) {
          console.log(responseData);
          fn(responseData);
      },
      error: function (responseData, textStatus, errorThrown) {
          console.log('POST failed. ' + responseData);
      }
  });
  }

  return {
    getEvents: getEvents,
  };
}
