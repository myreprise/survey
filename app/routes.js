var Subjects = require('./models/SubjectViews');

module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes	
	// sample api route
 app.get('/api/data', function(req, res) {
  // use mongoose to get all nerds in the database
  Subjects.find({}, {'_id': 0, 'sex': 1, 'educ': 1, 'occup': 1, 'income': 1, 'home_dist': 1, 'work_dist': 1, 'member_type': 1, 'total_visits': 1, 'would_return':1, 'ad_type':1, 'companion':1, 'retail_exp':1, 'f&b_exp':1, 'leisure_exp':1, 'per_visit_how_long_visit':1 }, function(err, subjectDetails) {
   // if there is an error retrieving, send the error. 
       // nothing after res.send(err) will execute
   if (err) 
   res.send(err);
    res.json(subjectDetails); // return all nerds in JSON format
  });
 });


 // frontend routes =========================================================
 app.get('*', function(req, res) {
  res.sendfile('./public/login.html');
 });
}