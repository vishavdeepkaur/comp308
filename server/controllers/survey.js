let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/survey').Survey;

// Read and display the Survey List
module.exports.ReadSurveyList = (req, res) => {
  // find all surveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/allSurveys', {
        title: 'Surveys',
        surveys: surveys,
       // displayName: req.user.displayName
      });
    }
  });
}

// displays the Details page - allowing users to add a new Survey
module.exports.DisplayAdd = (req, res) => {
  res.render('survey/index', {
    title: "Create Survey",
    surveys: '',
    displayName: req.user ? req.user.displayName : ''
  });
}

// displays the create from scratch page - allowing users to add a new Survey
module.exports.DisplayCreated = (req, res) => {
  res.render('content/created', {
    title: "My Survey",
    surveys: '',
    displayName: req.user ? req.user.displayName : ''
  });
}

// displays the create from scratch page - allowing users to add a new Survey
module.exports.DisplayShortAnswers = (req, res) => {
  res.render('survey/detailshort', {
    title: "Survey Name",
    surveys: '',
    displayName: req.user ? req.user.displayName : ''
  });
}

// displays the create from scratch page - allowing users to add a new Survey
module.exports.DisplayRatingAnswers = (req, res) => {
  res.render('survey/detailrating', {
    title: "Survey Name",
    surveys: '',
    displayName: req.user ? req.user.displayName : ''
  });
}






// Displays the Survey to take it
// find the survey by id and populate the form
module.exports.DisplaySurvey = (req, res) => {
  try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one survey by its id
      survey.findById(id, (err, surveys) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the survey details view
          res.render('surveys/details', {
              title: 'Survey Details',
              surveys: surveys,
              displayName: req.user.displayName
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
}

// Update an existing Survey in the surveys collection
module.exports.UpdateSurvey = (req, res) => {
  // get a reference to the id from the url
    let id = req.params.id;

     let updatedSurvey = survey({
       "_id": id,
      /*
      * Change values here 
      */
      "surveyName": req.body.name,
      "survey_Description": '',
      "survey_UserId": '',
      "survey_AvailableOn":'',
      "survey_ExpiresOn":'',
      "survey_active":''
    });

    survey.update({_id: id}, updatedSurvey, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the survey List
        res.redirect('/survey');
      }
    });
}

// Deletes a survey from the surveys collection
module.exports.DeleteSurvey = (req, res) => {
    // get a reference to the id from the url
    let id = req.params.id;

    survey.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the surveys list
        res.redirect('/survey');
      }
    });
}
/*
* new code Taran
*/
/*
* edit ids here
*/
module.exports.CreateSurvey = (req, res) => {
  let newSurvey = survey({
      "surveyName": req.body.sname,
      "survey_Description": req.body.sdesc,
      "survey_UserId": req.user._id,
      "survey_question1":req.body.q1,
      "survey_question2":req.body.q2,
      "survey_question3":req.body.q3,
      "survey_question4":req.body.q4,
      "survey_question5":req.body.q5
      // if(req.body.optradio == 'Yes')
      // {

      // }
      // else
      // {

      // }
    });

    survey.create(newSurvey, (err, survey) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("created");
        res.redirect('/surveys');
      }
    });
}
module.exports.CreateSurveyQuestions= (req,res) => {
  /*
* edit ids here
*/

  let newQuestion = question({
      "surveyId": req.body.name,
      "question_Description": req.body.cost,
      "question_type": req.body.rating,
      "question_OptionsCount":''
    });

    question.create(newQuestion, (err, question) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/surveys');// redirect path
      }
    });

}