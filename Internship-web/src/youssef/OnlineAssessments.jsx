import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnlineAssessments.css';

export default function OnlineAssessments() {
  const navigate = useNavigate();

  const assessments = [
    {
      id: 1,
      title: 'Math Test',
      questions: [
        {
          id: 1,
          question: 'What is 2 + 2?',
          choices: ['3', '4', '5', '6'],
          correctAnswer: '4',
        },
        {
          id: 2,
          question: 'What is 5 + 3?',
          choices: ['7', '8', '9', '10'],
          correctAnswer: '8',
        },
      ],
    },
    {
      id: 2,
      title: 'English Test',
      questions: [
        {
          id: 1,
          question: 'What is the antonym of "happy"?',
          choices: ['Sad', 'Joyful', 'Angry', 'Calm'],
          correctAnswer: 'Sad',
        },
        {
          id: 2,
          question: 'What is the plural of "child"?',
          choices: ['Children', 'Childs', 'Kids', 'Childrenen'],
          correctAnswer: 'Children',
        },
      ],
    },
  ];

  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [completedAssessments, setCompletedAssessments] = useState(
    JSON.parse(localStorage.getItem('completedAssessments')) || []
  );
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);

  const handleStartAssessment = (assessmentId) => {
    const assessment = assessments.find((a) => a.id === assessmentId);
    setCurrentAssessment(assessment);
    setAnswers({});
    setScore(null);
    setAssessmentSubmitted(false);
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  const handleSubmitAssessment = () => {
    if (!currentAssessment) return;

    const correctAnswersCount = currentAssessment.questions.reduce((count, question) => {
      if (answers[question.id] === question.correctAnswer) {
        count++;
      }
      return count;
    }, 0);

    const newScore = (correctAnswersCount / currentAssessment.questions.length) * 100;
    setScore(newScore);
    setAssessmentSubmitted(true);

    const newCompletedAssessment = {
      assessmentId: currentAssessment.id,
      score: newScore,
      answers,
    };

    const updatedCompletedAssessments = [...completedAssessments, newCompletedAssessment];
    setCompletedAssessments(updatedCompletedAssessments);
    localStorage.setItem('completedAssessments', JSON.stringify(updatedCompletedAssessments));

    setCurrentAssessment(null);
  };

  const isAssessmentCompleted = (assessmentId) => {
    return completedAssessments.some((a) => a.assessmentId === assessmentId);
  };

  return (
    <div className="container">
      <h2 className="header">Online Assessments</h2>

      {currentAssessment ? (
        <div>
          <h3 className="assessment-title">{currentAssessment.title}</h3>
          <form>
            {currentAssessment.questions.map((question) => (
              <div key={question.id} className="question-container">
                <h4>{question.question}</h4>
                <div>
                  {question.choices.map((choice, index) => (
                    <label key={index} className="answer-option">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={choice}
                        checked={answers[question.id] === choice}
                        onChange={() => handleAnswerChange(question.id, choice)}
                      />
                      <span>{choice}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleSubmitAssessment}
              disabled={assessmentSubmitted}
              className={`button submit-button ${assessmentSubmitted ? 'button-disabled' : ''}`}
            >
              {assessmentSubmitted ? 'Assessment Submitted' : 'Submit Assessment'}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h3 className="assessment-title">Available Assessments</h3>
          <ul className="assessment-list">
            {assessments.map((assessment) => (
              <li key={assessment.id} className="assessment-item">
                <h4>{assessment.title}</h4>
                <p>{assessment.questions.length} questions</p>
                {isAssessmentCompleted(assessment.id) ? (
                  <button disabled className="button button-disabled">Submitted</button>
                ) : (
                  <button
                    onClick={() => handleStartAssessment(assessment.id)}
                    className="button"
                  >
                    Start Test
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {score !== null && (
        <div className="score-section">
          <h3>Your Score: {score}%</h3>
          <p>{score >= 50 ? 'You passed!' : 'You failed. Better luck next time!'}</p>
        </div>
      )}

      <div className="previous-scores">
        <h3>Previous Assessment Scores:</h3>
        <ul>
          {completedAssessments.map((assessment, idx) => (
            <li key={idx}>
              <strong>Assessment {assessment.assessmentId}:</strong> {assessment.score}% |{' '}
              {assessment.score >= 50 ? 'Passed' : 'Failed'}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <button onClick={() => navigate('/prostudentextras')} className="button">
          ← Back
        </button>
      </div>
    </div>
  );
}

