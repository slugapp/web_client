function main() {
  var model = newEventListModel(newEventApi());
  var view = newEventListView();
  newEventListController(model, view);
  

  document.getElementById("refresh")
          .onclick = function() {
      model.update();
    };

  var body = document.getElementsByTagName("BODY")[0];
  body.appendChild(view.root);
}
