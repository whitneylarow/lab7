var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find({ '_id': projectID })
    .exec(afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  form_data.title = form_data.project_title;

  var newProj = new models.Project(form_data);
  newProj.save(afterSaving);

  function afterSaving(err) {
    if(err) console.log(err);
    res.send();
  };
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  console.log('deleting '+projectID);
  models.Project
    .find({ '_id': projectID })
    .remove()
    .exec(deleteCallback);

  function deleteCallback(err) {
    if(err) console.log(err);
    res.send();
  }
}