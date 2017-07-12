import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import _ from 'underscore';
import $ from 'jquery';

import {fetchQuestionnaire, fetchDataElements, saveAnswer} from '../../actions/questionnaire'
import QuestionnaireHead from './header';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {};
  }

  componentWillMount() {
    let _this = this;
    this.props.fetchQuestionnaire().then(function(response) {
      let Questions = response.payload.data.res.data,
        userProfile = response.payload.data.user.profile,
        nextQuestion = Questions.questionnaireDetail[0],
        qIndex = 0,
        skipToNextQuestion = false;

      //verify dependency
      if (nextQuestion && typeof nextQuestion.dependency !== 'undefined') {
        skipToNextQuestion = (nextQuestion.dependency.length > 0);
      }
      // verify gender
      if (nextQuestion && nextQuestion.gender !== "0") {
        skipToNextQuestion = true;
      }
      while (skipToNextQuestion === true) {
        skipToNextQuestion = false;
        if (nextQuestion.dependency.length) {
          skipToNextQuestion = true;
          var dependencyQuestion = nextQuestion.dependency[0].dependencyQuestion;
          var dependencyAnswer = nextQuestion.dependency[0].dependencyAnswer;
          var questionAns = userProfile.answers;
          if (questionAns) {
            var answer = _.where(questionAns, {questionId: dependencyQuestion});
            answer = [].concat(answer[0]['ansId']);
          }
          if (answer.length > 0) {
            for (var i = 0; i < dependencyAnswer.length; i++) {
              if (answer.indexOf(dependencyAnswer[i].answers) > -1) {
                skipToNextQuestion = false;
                break;
              }
            }
          }
        }
        if (nextQuestion.gender !== "0" && userProfile.gender !== nextQuestion.gender) {
          skipToNextQuestion = true;
        }
        if (skipToNextQuestion === true) {
          qIndex += 1;
          if (typeof Questions.questionnaireDetail[qIndex] !== 'undefined') {
            nextQuestion = Questions.questionnaireDetail[qIndex];
          } else {
            //qIndex -= 1;
            nextQuestion = undefined;
            skipToNextQuestion = false;
          }
        }
      }
      //set question nunmber
      nextQuestion['quesNum'] = 1;
      nextQuestion['nextQindex'] = 1;
      nextQuestion['prevQindex'] = 0;
      nextQuestion['disabled'] = true;
      console.log(nextQuestion, "nextQuestion");
      //let firstArr = [questions[0]]
      _this.setState(nextQuestion);
    });
  }

  //previous click event
  prevQuestion(prevqIndex, e) {
    e.preventDefault();
    console.log(prevqIndex);
    // let curr = this.state;
    // console.log(curr.answerSet, "curr.answerSet");
    // curr.answerSet.push({name: 'Dinesh'})
    // this.setState(curr);
  }

  //next click event
  nextQuestion(e) {
    e.preventDefault();
    let _this = this,
      allData = _this.props.all.questionnaireDetail,
      userProfile = _this.props.userData.profile,
      dataElements = _this.props.dataElements,
      nextqIndex = parseInt($(e.currentTarget).attr("data-next-qindex"), 10),
      prevIndex = nextqIndex - 1,
      questionId = allData[prevIndex].questionsId,
      ansId,
      dataElement = $('#' + questionId).attr('element-type'),
      questionType = allData[prevIndex].questionType,
      errMessage = 'pls_fill_the_correct_value'; //getLangText("pls_fill_the_correct_value");
    if (questionType === '5') {
      ansId = $("input:radio[name=" + questionId + "]:checked").attr("id");
    } else if (questionType === '8') {
      ansId = $('input[name^="' + questionId + '"]:checked').map(function() {
        return this.value;
      }).get();
    } else {
      ansId = $('#' + questionId).val();
    }
    if (ansId !== '' && ansId !== undefined) {
      $('.show_validation').hide();
      let checkValidation = _this.validateForm($('#' + questionId).attr('type'), ansId);
      if (checkValidation === '') {
        if (!dataElement) {
          let questionObj = { questionId: questionId, ansId: ansId };
          _this.props.saveAnswer(questionObj).then(function(result){
            return true;
          }, function(error){
            console.log(error);
          });
        } else {
          let questionArray = [];
          if (dataElement === 'wake_time' || dataElement === 'birthday' || dataElement === 'distance' || dataElement === 'bedtime' || dataElement === 'breakfast' || dataElement === 'lunch' || dataElement === 'dinner' || dataElement === 'water' || dataElement === 'cigarette') {
            questionArray.push({questionId: questionId, ansId: ansId, dataElement: dataElement});
            // Meteor.call("questionDataElement", questionArray, function(error, result) {
            // 		if (result) {
            // 				//return true;
            // 		}
            // });
          }

          //Hieght element calculation
          if (dataElement === 'height') {
            let keyUnit = $('#heightunit').val(),
              value,
              value2,
              inches,
              attrVal;
            if (keyUnit === 'inch') {
              value = $('input.height-feet').val() ? $('input.height-feet').val() : 0;
              value2 = $('input.height-inch').val() ? $('input.height-inch').val() : 0;
              inches = parseInt(value * 12, 10) + parseInt(value2, 10);

              if (value2 >= 12) {
                value = parseInt(value, 10) + parseInt(value2 / 12, 10);
                value2 = inches - (value * 12);
              }
              //console.log('value:', value);
              //console.log('value2:', value2);
              attrVal = inches;
            } else {
              attrVal = $('input.height-cm').val() ? $('input.height-cm').val() : 0;
            }
            attrVal = parseFloat(attrVal, 10);

            //console.log('keyUnit:', keyUnit);
            //console.log('attrVal:', attrVal);

            // let flag = false,
            let attr = $('#' + questionId).attr("element-type");
            //-------check units-------//
            //deUnit = attr + '_value';

            //-------check data elements-------//
            this.props.fetchDataElements(attr).then(function(response) {
              let dataElementkeyUnit = response.payload.data.res,
              unitRange = dataElementkeyUnit.ranges;
              if (unitRange !== undefined) {
                for (var r = 0; r < unitRange.length; r++) {
                  if (unitRange[r].unit === keyUnit) {
                    // let keyVal = attrVal + ' ' + keyUnit;
                    if (keyUnit === 'inch') {
                      if (value % 1 !== 0) {
                        attrVal = ((attrVal / 12) * 100) / 100;
                      } else {
                        attrVal = ((value + '.' + value2) * 100) / 100;
                      }
                      //console.log('attrVal:', attrVal);
                      //console.log('unitRange:', unitRange[r]);
                      if (parseInt(unitRange[r].max_val, 10) >= attrVal && parseInt(unitRange[r].min_val, 10) <= attrVal) {
                        questionArray.push({questionId: questionId, ansId: (inches), dataElement: dataElement, unit: keyUnit});
                        // Meteor.call("questionDataElement", questionArray, function(error, result) {
                        //   if (result) {
                        //     return true;
                        //   }
                        // });
                      } else {
                        let errMessage = 'valid_range_min_max'; //getLangText("valid_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                        $('.show_validation').show();
                        $('.show_validation').html(" ");
                        $('.show_validation').html(errMessage);
                        $('.nextattr').css('background', '#DFDFDF');
                        return false;
                      }
                    } else {
                      if (unitRange[r].max_val >= attrVal && attrVal >= unitRange[r].min_val) {
                        questionArray.push({questionId: questionId, ansId: (attrVal), dataElement: dataElement, unit: keyUnit});
                        // Meteor.call("questionDataElement", questionArray, function(error, result) {
                        //   if (result) {
                        //     return true;
                        //   }
                        // });
                      } else {
                        let errMessage = 'valid_range_min_max'; //getLangText("valid_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                        $('.show_validation').show();
                        $('.show_validation').html(" ");
                        $('.show_validation').html(errMessage);
                        $('.nextattr').css('background', '#DFDFDF');
                        return false;
                      }
                    }
                  }
                }
              }
            });
          }
          //weight data element calculation
          if (dataElement === 'weight') {
            //let flag = false,
            let attrVal = ansId;
            attrVal = parseInt(attrVal, 10);
            let attr = $('#' + allData[prevIndex].questionsId).attr("element-type");
            //-------check units-------//
            // let deUnit = attr + '_value',
            let keyUnit = $('#weightunit').val();

            //-------check data elements-------//
            this.props.fetchDataElements(attr).then(function(response) {
              let dataElementkeyUnit = response.payload.data.res,
                unitRange = dataElementkeyUnit.ranges;
              if (unitRange !== undefined) {
                for (var r = 0; r < unitRange.length; r++) {
                  if (unitRange[r].unit === keyUnit) {
                    // let keyVal = attrVal + ' ' + keyUnit;
                    if (unitRange[r].max_val >= attrVal && attrVal >= unitRange[r].min_val) {
                      questionArray.push({questionId: questionId, ansId: ansId, dataElement: dataElement, unit: keyUnit});
                      // Meteor.call("questionDataElement", questionArray, function(error, result) {
                      //   if (result) {
                      //     return true;
                      //   }
                      // });
                    } else {
                      let errMessage = 'valid_range_min_max'; //getLangText("valid_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                      $('.show_validation').show();
                      $('.show_validation').html(" ");
                      $('.show_validation').html(errMessage);
                      $('.nextattr').css('background', '#DFDFDF');
                      return false;
                    }
                  }
                }
              }
            });
          }
          //alcohal data element
          if (dataElement === 'alcohol') {
            questionArray.push({questionId: questionId, ansId: ansId, dataElement: dataElement});
            // Meteor.call("questionDataElement", questionArray, function(error, result) {
            //   if (result) {
            //       //return true;
            //   }
            // });
          }
          // blood_glucose data element
          if (dataElement === 'blood_glucose') {
            // let flag = false,
            let attrVal = ansId;
            attrVal = parseInt(attrVal, 10);
            let attr = $('#' + allData[prevIndex].questionsId).attr("element-type");
            //-------check units-------//
            let deUnit = attr + '_value',
              keyUnit = userProfile[deUnit];
            //-------check data elements-------//
            this.props.fetchDataElements(attr).then(function(response) {
              let dataElementkeyUnit = response.payload.data.res,
                unitRange = dataElementkeyUnit.ranges;
              if (unitRange !== undefined) {
                for (var r = 0; r < unitRange.length; r++) {
                  if (unitRange[r].unit === keyUnit) {
                    // var keyVal = attrVal + ' ' + keyUnit;
                    if (unitRange[r].max_val >= attrVal && attrVal >= unitRange[r].min_val) {
                      questionArray.push({questionId: questionId, ansId: ansId, dataElement: dataElement, unit: keyUnit});
                      // Meteor.call("questionDataElement", questionArray, function(error, result) {
                      //   if (result) {
                      //     return true;
                      //   }
                      // });
                    } else {
                      let errMessage = 'valid_range_min_max'; //getLangText("valid_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                      $('.show_validation').show();
                      $('.show_validation').html(" ");
                      $('.show_validation').html(errMessage);
                      $('.nextattr').css('background', '#DFDFDF');
                      return false;
                    }
                  }
                }
              }
            });
          }
          //blood_pressure data element
          if (dataElement === 'blood_pressure') {
            let systolicFlag = false,
              systolicVal = parseInt($("#systolicInput").val(), 10),
              disatolicVal = parseInt($("#disatolicInput").val(), 10);
              //alert(systolicVal +"****"+disatolicVal)
            let attr = $('#' + allData[prevIndex].questionsId).attr("element-type");
            //-------check units-------//
            let deUnit = attr + '_value',
              keyUnit = userProfile['profile'][deUnit];

            //-------check data elements-------//
            this.props.fetchDataElements(attr).then(function(response) {
              let dataElementkeyUnit = response.payload.data.res,
                unitRange = dataElementkeyUnit.ranges;
              if (unitRange !== undefined) {
                for (let r = 0; r < unitRange.length; r++) {
                  if (unitRange[r].unit === keyUnit && unitRange[r].special === 'systolic') {
                    if (unitRange[r].max_val >= systolicVal && systolicVal >= unitRange[r].min_val) {
                      systolicFlag = true;
                      $('.show_validation').hide();
                    } else {
                      let errMessage = 'valid_systolic_range_min_max'; //getLangText("valid_systolic_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                      $('#disatolicInput').css({borderColor: '#333'});
                      $('#systolicInput').css({borderColor: 'red'});
                      $('.show_validation').show();
                      $('.show_validation').html(" ");
                      $('.show_validation').html(errMessage);
                      $('.nextattr').css('background', '#DFDFDF');
                      return false;
                    }
                  }
                }
                if (systolicFlag) {
                  for (let r = 0; r < unitRange.length; r++) {
                    if (unitRange[r].unit === keyUnit && unitRange[r].special === 'disatolic') {
                      if (unitRange[r].max_val >= disatolicVal && disatolicVal >= unitRange[r].min_val) {
                        questionArray.push({
                          questionId: questionId,
                          ansId: ansId,
                          systolic: systolicVal,
                          disatolic: disatolicVal,
                          dataElement: dataElement,
                          unit: keyUnit
                        });
                        // Meteor.call("questionDataElement", questionArray, function(error, result) {
                        //   if (result) {
                        //     return true;
                        //   }
                        // });
                      } else {
                        let errMessage = 'valid_disatolic_range_min_max'; //getLangText("valid_disatolic_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                        $('#disatolicInput').css({borderColor: 'red'});
                        $('#systolicInput').css({borderColor: '#333'});
                        $('.show_validation').show();
                        $('.show_validation').html(" ");
                        $('.show_validation').html(errMessage);
                        $('.nextattr').css('background', '#DFDFDF');
                        return false;
                      }
                    }
                  }
                }
              }
            });
          }
          //cholesterol data elements
          if (dataElement === 'cholesterol') {
            // let flag = false,
            let totalCholFlag = false,
              hdlCholFlag = false,
              ldlCholFlag = false;
              //triCholFlag = false;
            let attr = $('#' + allData[prevIndex].questionsId).attr("element-type"),
              totalChol = $("#total_chol").val(),
              hdlChol = $("#hdl_chol").val(),
              ldlChol = $("#ldl_chol").val(),
              triChol = $("#tri_chol").val();
            //console.log(attr+','+totalChol+','+hdlChol+','+ldlChol+','+triChol)
            if (attr !== '' && (totalChol !== '' || hdlChol !== '' || ldlChol !== '' || triChol !== '')) {
              $('.show_validation').hide();
              totalChol = parseFloat(totalChol);
              hdlChol = parseFloat(hdlChol);
              ldlChol = parseFloat(ldlChol);
              triChol = parseFloat(triChol);
              //-------check units-------//
              let deUnit = attr + '_value',
                keyUnit = userProfile['profile'][deUnit];

              //-------check data elements-------//
              this.props.fetchDataElements(attr).then(function(response) {
                let dataElementkeyUnit = response.payload.data.res,
                  unitRange = dataElementkeyUnit.ranges;
                if (unitRange !== undefined) {
                  for (let r = 0; r < unitRange.length; r++) {
                    if (unitRange[r].unit === keyUnit && unitRange[r].special === 'total') {
                      //console.log(unitRange[r].max_val,' >= ',totalChol,' && ',totalChol,' >= ',unitRange[r].min_val)
                      if (unitRange[r].max_val >= totalChol && totalChol >= unitRange[r].min_val) {
                        totalCholFlag = true;
                      } else {
                        let errMessage = 'valid_cholesterol_range_min_max'; //getLangText("valid_cholesterol_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                        $('#total_chol').css({borderColor: 'red'});
                        $('#hdl_chol').css({borderColor: '#333'});
                        $('#ldl_chol').css({borderColor: '#333'});
                        $('#tri_chol').css({borderColor: '#333'});
                        $('.show_validation').show();
                        $('.show_validation').html(" ");
                        $('.show_validation').html(errMessage);
                        $('.nextattr').css('background', '#DFDFDF');
                        return false;
                      }
                    }
                  }
                  if (totalCholFlag) {
                    for (let r = 0; r < unitRange.length; r++) {
                      if (unitRange[r].unit === keyUnit && unitRange[r].special === 'hdl') {
                        if (unitRange[r].max_val >= hdlChol && hdlChol >= unitRange[r].min_val) {
                          hdlCholFlag = true;
                        } else {
                          let errMessage = 'valid_hdl_chole_range_min_max'; //getLangText("valid_hdl_chole_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                          $('#total_chol').css({borderColor: '#333'});
                          $('#hdl_chol').css({borderColor: 'red'});
                          $('#ldl_chol').css({borderColor: '#333'});
                          $('#tri_chol').css({borderColor: '#333'});
                          $('.show_validation').show();
                          $('.show_validation').html(" ");
                          $('.show_validation').html(errMessage);
                          $('.nextattr').css('background', '#DFDFDF');
                          return false;
                        }
                      }
                    }
                    if (hdlCholFlag) {
                      for (let r = 0; r < unitRange.length; r++) {
                        if (unitRange[r].unit === keyUnit && unitRange[r].special === 'ldl') {
                          if (unitRange[r].max_val >= ldlChol && ldlChol >= unitRange[r].min_val) {
                            ldlCholFlag = true;
                          } else {
                            let errMessage = 'valid_ldl_chole_range_min_max'; //getLangText("valid_ldl_chole_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                            $('#total_chol').css({borderColor: '#333'});
                            $('#hdl_chol').css({borderColor: '#333'});
                            $('#ldl_chol').css({borderColor: 'red'});
                            $('#tri_chol').css({borderColor: '#333'});
                            $('.show_validation').show();
                            $('.show_validation').html(" ");
                            $('.show_validation').html(errMessage);
                            $('.nextattr').css('background', '#DFDFDF');
                            return false;
                          }
                        }
                      }
                      if (ldlCholFlag) {
                        for (var r = 0; r < unitRange.length; r++) {
                          if (unitRange[r].unit === keyUnit && unitRange[r].special === 'tri') {
                            if (unitRange[r].max_val >= triChol && triChol >= unitRange[r].min_val) {
                              questionArray.push({
                                questionId: questionId,
                                ansId: ansId,
                                total: totalChol,
                                ldl: ldlChol,
                                hdl: hdlChol,
                                tri: triChol,
                                dataElement: dataElement,
                                unit: keyUnit
                              });
                              // Meteor.call("questionDataElement", questionArray, function(error, result) {
                              //     if (result) {
                              //         return true;
                              //     }
                              // });
                            } else {
                              let errMessage = 'valid_tri_chole_range_min_max'; //getLangText("valid_tri_chole_range_min_max", unitRange[r].min_val, unitRange[r].max_val);
                              $('#total_chol').css({borderColor: '#333'});
                              $('#hdl_chol').css({borderColor: '#333'});
                              $('#ldl_chol').css({borderColor: '#333'});
                              $('#tri_chol').css({borderColor: 'red'});
                              $('.show_validation').show();
                              $('.show_validation').html(" ");
                              $('.show_validation').html(errMessage);
                              $('.nextattr').css('background', '#DFDFDF');
                              return false;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              });
            } else {
              let errMessage = 'errMessage';
              $('.show_validation').show();
              $('.show_validation').html(" ");
              $('.show_validation').html(errMessage);
              $('.nextattr').css('background', '#DFDFDF');
              return false;
            }
          }
        }

        //find next question in loop
        var nextQuestion = allData[nextqIndex],
          skipToNextQuestion = false;

        // verify dependency
        if (nextQuestion && typeof nextQuestion.dependency !== 'undefined') {
          skipToNextQuestion = (nextQuestion.dependency.length > 0);
        }
        // verify gender
        if (nextQuestion && nextQuestion.gender !== "0") {
          skipToNextQuestion = true;
        }

        while (skipToNextQuestion === true) {
          skipToNextQuestion = false;

          if (nextQuestion.dependency.length) {
            skipToNextQuestion = true;
            var dependencyQuestion = nextQuestion.dependency[0].dependencyQuestion;
            var dependencyAnswer = nextQuestion.dependency[0].dependencyAnswer;
            //console.log('dependencyQuestion:', dependencyQuestion);
            //console.log('dependencyAnswer:', dependencyAnswer);
            let answer;
            if (questionId === dependencyQuestion) {
              answer = [].concat(ansId);
            } else {
              var questionAns = userProfile.answers;
              if (questionAns) {
                answer = _.where(questionAns, {questionId: dependencyQuestion});
                if (answer.length) {
                  answer = [].concat(answer[0]['ansId']);
                }
              }
            }
            if (answer.length > 0) {
              for (var i = 0; i < dependencyAnswer.length; i++) {
                if (answer.indexOf(dependencyAnswer[i].answers) > -1) {
                  skipToNextQuestion = false;
                  break;
                }
              }
            }
          }
          //console.log('skipToNextQuestion:', skipToNextQuestion);

          //console.log('nextQuestion.gender:', nextQuestion.gender);
          //console.log('profile.gender:', Meteor.user().profile.gender);
          if (nextQuestion.gender !== "0" && userProfile.gender !== nextQuestion.gender) {
            skipToNextQuestion = true;
          }

          //console.log('skipToNextQuestion:', skipToNextQuestion);
          if (skipToNextQuestion === true) {
            prevIndex = nextqIndex;
            nextqIndex += 1;

            if (typeof allData[nextqIndex] !== 'undefined') {
              nextQuestion = allData[nextqIndex];
            } else {
              //qIndex -= 1;
              nextQuestion = undefined;
              skipToNextQuestion = false;
            }
          }
        }

        // Session.set('elementValue', undefined);
        // Session.set('elementValueArray', undefined);
        if (nextQuestion && nextQuestion.questionsId) {
          $('.content-area-first').addClass('animated bounceOutLeft');
        }

        /* end find next question in loop */

        // update finish button to say finish for last question?
        if ((allData.length - 1) === nextqIndex) {
          $('.nextattr').html("<span>" +
            "finish" +
            "</span>"); //getLangText("finish")
          $('.nextattr').attr('next-qindex', nextqIndex + 1);
          $('.prevattr').attr('prev-qindex', nextqIndex);
          $('.prevattr').attr('disabled', false);
        } else if (allData.length <= nextqIndex + 1) {
          let quesIndex = 0, quesNum = 1;
          /* find next question in loop */
          let nextQuestion = allData[quesIndex],
            skipToNextQuestion = false,
            skipAnsweredQues = true;

          // verify dependency
          if (nextQuestion && typeof nextQuestion.dependency !== 'undefined') {
            skipToNextQuestion = (nextQuestion.dependency.length > 0);
          }

          // verify gender
          if (nextQuestion && nextQuestion.gender !== "0") {
            skipToNextQuestion = true;
          }

          let answers = userProfile.answers;
          // skip if already answered
          if (skipAnsweredQues === true) {
            let userQuestion = _.where(answers, {questionId: nextQuestion.questionsId});
            if (userQuestion.length && userQuestion[0].ansId) {
              skipToNextQuestion = true;
            }
          }

          while (skipToNextQuestion === true) {
            skipToNextQuestion = false;
            if (nextQuestion.dependency.length) {
              skipToNextQuestion = true;
              let dependencyQuestion = nextQuestion.dependency[0].dependencyQuestion,
                dependencyAnswer = nextQuestion.dependency[0].dependencyAnswer,
                questionAns = userProfile.answers,
                answer;
              if (questionAns) {
                answer = _.where(questionAns, {questionId: dependencyQuestion});
                if (answer.length) {
                  answer = [].concat(answer[0]['ansId']);
                }
              }
              if (answer.length > 0) {
                for (let i = 0; i < dependencyAnswer.length; i++) {
                  if (answer.indexOf(dependencyAnswer[i].answers) > -1) {
                    skipToNextQuestion = false;
                    break;
                  }
                }
              }
            }

            if (nextQuestion.gender !== "0" && userProfile.gender !== nextQuestion.gender) {
              skipToNextQuestion = true;
            }

            // skip if already answered
            if (skipAnsweredQues === true && skipToNextQuestion !== true) {
              var quesIndexLast = quesIndex,
              quesNumLast = quesNum;
              if (isNaN(nextQuestion.questionType)) {
                let dataElement = _.where(dataElements, {_id: nextQuestion.questionType});
                if (dataElement.length && typeof userProfile[dataElement[0].type] !== 'undefined') {
                  quesNum += 1;
                  skipToNextQuestion = true;
                }
              } else {
                var userQuestion = _.where(userProfile.answers, {questionId: nextQuestion.questionsId});
                //console.log("userQuestion:", userQuestion);
                if (userQuestion.length && userQuestion[0].ansId && userQuestion[0].ansId.length) {
                  quesNum += 1;
                  skipToNextQuestion = true;
                }
              }
            }

            if (skipToNextQuestion === true) {
              quesIndex += 1;
              if (typeof allData[quesIndex] !== 'undefined') {
                nextQuestion = allData[quesIndex];
              } else {
                //quesIndex -= 1;
                quesIndex = quesIndexLast;
                quesNum = quesNumLast;
                nextQuestion = allData[quesIndex];
                skipToNextQuestion = false;
              }
            }
          }

          //Session.set('questionSet', nextQuestion);
          //Session.set('quesNum', quesNum);
          nextQuestion['quesNum'] = quesNum;
          // console.log('nextQuestion', nextQuestion , quesNum , quesIndex)
          var quesIndexForFinishCase = quesIndex;
          var questionnaireLen = allData.length;
          if (nextQuestion.questionsId === allData[questionnaireLen - 1]["questionsId"]) {
            alert(1);
            // we reached the last question, so lets finsih with calculating lifeScore here and exiting
              //Session.set("disableNext", true);
              // IonLoading.show({
              //   customTemplate: getLangText("calculating") + '<img src="/img/cheking-loader.gif" class="connecting-loading">'
              // });
          } else {
            alert(2);
            // if there is a question remaining in the questionnaire, run this!
            setTimeout(function() {
              $('.quest-srch-hint').hide();
              $('.nextattr').attr('next-qindex', quesIndexForFinishCase + 1);
              $('.prevattr').attr('prev-qindex', quesIndexForFinishCase);
              $('.nextattr').html("<span>next</span>"); //getLangText("next")
              $('.prevattr').attr('disabled', false);
              //console.log('quesIndex======>', quesIndexForFinishCase)
              nextQuestion.quesNum = quesNum;
              // console.log('nextQuestion===2===>', nextQuestion , quesNum)
              // Session.set("questionSet", nextQuestion);
              // $('.nextattr').trigger('click');
            }, 50);
          }
        }else{
          $('.nextattr').attr('data-next-qindex', nextqIndex + 1);
          $('.prevattr').attr('data-prev-qindex', nextqIndex);
          $('.nextattr').html("<span>next</span>"); //getLangText("next")
          $('.prevattr').attr('disabled', false);
        }

        if (nextQuestion) {
          let quesIndex = parseInt($('#ques_index').html(), 10);
          quesIndex += 1;
          nextQuestion['quesNum'] = quesIndex;
          setTimeout(function() {
            // reset old value
            if (nextQuestion.questionType === '5' || nextQuestion.questionType === '8') {
              $("input[name^='" + questionId + "']").prop("checked", false);
            } else {
                $('#' + questionId).val("");
            }
            _this.setState(nextQuestion);
            // setTimeout(function() {
            //     $(".content-area").scrollTop(0);
            //     $(".content-area-first").removeClass("animated bounceOutLeft");
            // }, 250);

          }, 200);
        }
      }
    }else{
      $('#' + allData[prevIndex].questionsId).css({
          borderColor: 'red'
      });
      $('.show_validation').show();
      $('.show_validation').html(" ");
      $('.show_validation').html(errMessage);
      $('.nextattr').css('background','#DFDFDF');
      return false;
    }
    // let curr = this.state;
    // console.log(curr.answerSet, "curr.answerSet");
    // curr.answerSet.push({name: 'Dinesh'})
    // this.setState(curr);
  }

  validateForm(type, value) {
    let checkFlag = '';
    if (type === 'email') {
      let filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!filter.test(value)) {
        checkFlag = 'pls_enter_valid_email'; //getLangText("pls_enter_valid_email");
      }
    } else {
      checkFlag = '';
    }
    return checkFlag;
  }

  render() {
    //Set button text
    let nextButtonText,
      disabled = false,
      nextButtonColor = {
        background: '#DFDFDF'
      };
    if (this.props.all.questionnaireDetail) {
      nextButtonText = 'Next'
      if ((this.props.all.questionnaireDetail.length - 1) === this.state.qIndex) {
        nextButtonText = 'Finish'
      }
    }
    //set disable previous button
    if (this.state.disabled) {
      disabled = true;
    }

    //Set next button color using category color
    if (this.state.categoryColor) {
      nextButtonColor = {
        background: this.state.categoryColor
      };
    }

    return (
      <div className="lesson-block layout-column">
        <QuestionnaireHead quesNum={this.state.quesNum} catColor={this.state.categoryColor} catName={this.state.categoryName
          ? this.state.categoryName.en
          : null} qText={this.state.questionTitle
          ? this.state.questionTitle.en
          : null}/>
        <div className="question-content flex scroll">




          <div className="question-type">

            {/*Input structure1*/}
            <div className="layout-row input-row ">
              <div className="flex col-padd-r">
                <label className="input-label">Feet</label>
                <input type="number" />
              </div>
              <div className="flex col-padd-r">
                <label className="input-label">Inch</label>
                <input type="number" />
              </div>
              <div className="flex-end">
                <select>
                  <option value="cm">cm</option>
                  <option value="inch">ft/inches</option>
                </select>
              </div>
             </div>

            {/*Input structure2*/}
            <div className="layout-row input-row flex-wrap">
              <div className="flex col-padd-b col-padd-r width50">
                 <label className="input-label">Feet</label>
                 <input type="number" />
              </div>
              <div className="flex col-padd-b width50">
                <label className="input-label">Inch</label>
                <input type="number" />
              </div>
              <div className="flex col-padd-b col-padd-r width50">
                <label className="input-label">Inch</label>
                <input type="number" />
              </div>
              <div className="flex col-padd-b width50">
                <label class="input-label">Inch</label>
                <input type="number" />
              </div>
            </div>

            {/*questionnaire message structure*/}
           <div className="questionaire-msg">
            <p> Marital status can have a number of influences on our health.</p>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
           </div>

          {/*Checkboxes structure*/}
          <label className="question-type-rw layout-row space-between">
            Yes I'm ready to begin to  get healthy 0
            <input className="visible-hidden" name="questType" type="checkbox"/>
            <span className="checkbox-btn radio-btn"></span>
          </label>
          <label className="question-type-rw layout-row space-between">
            Yes I'm ready to begin to  get healthy
            <input className="visible-hidden" name="questType1" type="checkbox"/>
            <span className="checkbox-btn radio-btn"></span>
          </label>

          {/*Error Message*/}
          <div className="show_validation">Please fill the correct value.</div>

           

            {this.state.questionType === '1'
              ? <div className="input-field col s12">
                  <input id={this.state.questionsId} name={this.state.questionsId} type="text" className="validate" value=""/>
                </div>
              : this.state.questionType === '2'
                ? <div className="input-field col s12">
                    <input id={this.state.questionsId} name={this.state.questionsId} type="date" className="validate" value=""/>
                  </div>
                : this.state.questionType === '3'
                  ? <div className="input-field col s12">
                      <input id={this.state.questionsId} name={this.state.questionsId} type="time" className="validate" value=""/>
                    </div>
                  : this.state.questionType === '4'
                    ? <div className="form-group">
                        <select id={this.state.questionsId} name={this.state.questionsId} className="form-control select-cell browser-default">
                          <option value="" disabled>Please Select</option>
                          <div>
                              {
                                this.state.answerSet.map((obj, index) => (
                                  <option selected="" value={obj.ansId}>{obj.ansLbl}</option>
                                ))
                              }
                          </div>
                        </select>
                      </div>
                    : this.state.questionType === '5'
                      ? <div>
                          {this.state.answerSet.map((obj, index) => (
                            <label className="question-type-rw layout-row space-between" htmlFor={obj.ansId} key={index}>
                              {obj.ansLbl.en}
                              <input className="visible-hidden" type="radio" name={this.state.questionsId} value={obj.ansId} id={obj.ansId}/>
                              <span className="radio-btn"></span>
                            </label>
                          ))}
                        </div>
                      : this.state.questionType === '6'
                        ? <div className="input-field col s12">
                            <input id={this.state.questionsId} name={this.state.questionsId} type="number" className="validate" value=""/>
                          </div>
                        : this.state.questionType === '7'
                          ? <div className="input-field col s12">
                              <input id={this.state.questionsId} name={this.state.questionsId} type="number" className="validate" value=""/>
                            </div>
                          : this.state.questionType === '8'
                            ? <div>
                                { this.state.answerSet.map((obj, index) => (
                                  <label className="question-type-rw layout-row space-between" htmlFor={obj.ansId} key={index}>
                                    {obj.ansLbl.en}
                                    <input type="checkbox" id={obj.ansId} name={this.state.questionsId + '[]'} value={obj.ansId} data-reset-options={this.state.resetOptionsIndex === obj.index ? 'true' : null}/>
                                    <span className="radio-btn"></span>
                                  </label>
                                ))}
                              </div>
                            : null
}
          </div>
        </div>
        <div className="lesson-foot layout-row layout-wrap">
          <button disabled={disabled} className="btn primary-bg light flex prevattr" data-prev-qindex={this.state.prevQindex} onClick={this.prevQuestion.bind(this)}>
            <img src={require("../../assets/img/arrow-lft.png")} alt="Arrow Icon"/> Previous
          </button>
          <button className="btn primary-bg next flex nextattr" data-next-qindex={this.state.nextQindex} onClick={this.nextQuestion.bind(this)} style={nextButtonColor}>
            {nextButtonText} <img src={require("../../assets/img/arrow-rt.png")} alt="Arrow Icon"/>
          </button>
          <button className="btn secondary-bg save width100">
            Save & Exit
          </button>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return { all: state.questionnaire.all, userData: state.questionnaire.userData, dataElements: state.questionnaire.dataElements}
}

App.propTypes = {
  all: PropTypes.object,
  userData: PropTypes.object,
  dataElements: PropTypes.array
};

export default connect(mapStateToProps, {fetchQuestionnaire, fetchDataElements, saveAnswer })(App);
