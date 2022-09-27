import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem"

function QuestionList() {
  const [question, setQuestion] = useState([])
  // console.log(question)

  //fetching of questions (GET)
  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(response => response.json())
    .then((question) => setQuestion(question))
  }, [])

  //updating questions (PATCH)
  const handleUpdate = (id, body) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({body})
    })
    .then(response => response.json())
    .then((updatedQ) => {
      const updatedQuestion = question.map((q) => {
        if (q.id === updatedQ.id) {
          return updatedQ;
        }
        return q;
      })
      setQuestion(updatedQuestion)
    })
  }

  //(DELETE)
  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
    // doesn't need body because we're deleting the whole body by ID
    .then(response => response.json())
    .then(() => {
      // if the deletedquestion is not equal to a question id DELETE 
      const updatedQuestions = question.filter((q) => q.id !== id)
      setQuestion(updatedQuestions)
    })
  }

   const questionItems = question.map((q) => (
     <QuestionItem
       key={q.id}
       question={q}
       handleDelete={handleDelete}
       handleUpdate={handleUpdate}
     />
   ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
