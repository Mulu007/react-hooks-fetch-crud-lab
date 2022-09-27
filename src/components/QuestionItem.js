import React from "react";

//passed down handleDelete & handleUpdate as props
function QuestionItem({ handleDelete, handleUpdate, question }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleQuestionDelete = () => {
    handleDelete(id)
  }

  const handleQuestionUpdate =(event) => {
    handleUpdate(id, parseInt(event.target.value))
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange= {handleQuestionUpdate} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleQuestionDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
