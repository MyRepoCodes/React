import React, {Component} from 'react';

class QuestionnaireHead extends Component {
  render() {
    let background = {
      background:this.props.catColor
    };

    const hideValidation = {
      display: 'none'
    };

    return (
      <div className="lesson-head">
        <div className="lesson-category-ttl text-center" style={background}>
          {this.props.catName}
        </div>
        <div className="question layout-row">
          <div className="show_validation" style={hideValidation}></div>
          <label>Q<span className="question-index" id="ques_index">{this.props.quesNum}</span>:</label>
          <div className="flex">
            {this.props.qText}
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionnaireHead;
