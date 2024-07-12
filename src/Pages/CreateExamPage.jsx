import React, { useState } from "react";
import { Button, Form, Dropdown, Col, Card } from "react-bootstrap";
import {
  BsArrowRight,
  BsTrash,
  BsArrowUp,
  BsArrowDown,
  BsCircleFill,
  BsCheckCircleFill,
} from "react-icons/bs";

const CreateExamPage = () => {
  const [examName, setExamName] = useState("");
  const [showCreateExamSection, setShowCreateExamSection] = useState(false);
  const [selectedQuestionType, setSelectedQuestionType] = useState(null);
  const [numMCQs, setNumMCQs] = useState(0);
  const [mcqQuestions, setMCQQuestions] = useState([]);
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [warningMessage, setWarningMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [warningCallback, setWarningCallback] = useState(null);

  const handleExamNameSubmit = (e) => {
    e.preventDefault();
    if (examName.trim() !== "") {
      setShowCreateExamSection(true);
    }
  };

  const handleProceed = () => {
    if (examName.trim() === "") {
      showStatementWarning("Please enter exam name.");
      return;
    }
    if (selectedQuestionType === null) {
      showStatementWarning("Please select question type.");
      return;
    }
    if (selectedQuestionType === "mcq") {
      if (numMCQs <= 0) {
        showStatementWarning("Please enter a valid number of MCQs.");
        return;
      }
      const questions = [];
      for (let i = 1; i <= numMCQs; i++) {
        questions.push({
          id: i,
          weight: 1,
          correctAnswer: "",
          question: "",
        });
      }
      setMCQQuestions(questions);
    }
  };

  const handleAddNewMCQQuestion = () => {
    const newQuestion = {
      id: mcqQuestions.length + 1,
      weight: 1,
      correctAnswer: "",
      question: "",
    };
    setMCQQuestions([...mcqQuestions, newQuestion]);
    setNumMCQs(mcqQuestions.length + 1);
  };

  const handleSaveQuestion = () => {
    if (mcqQuestions.length === 0) {
      showStatementWarning("You cannot save a MCQ question with zero questions.");
      return;
    }
    if (mcqQuestions.every((question) => question.correctAnswer && question.weight > 0)) {
      const savedQuestion = {
        type: "mcq",
        numQuestions: numMCQs,
        totalWeight: mcqQuestions.reduce((acc, question) => acc + question.weight, 0),
        questions: mcqQuestions,
      };
      setSavedQuestions([...savedQuestions, savedQuestion]);
      setMCQQuestions([]);
      setNumMCQs(0);
      setSelectedQuestionType(null);
    } else {
      showStatementWarning("Please fill in all question data before saving.");
    }
  };

  const handleUpdateQuestion = (index) => {
    const updatedQuestion = savedQuestions[index];
    setMCQQuestions(updatedQuestion.questions);
    setNumMCQs(updatedQuestion.numQuestions);
    setSavedQuestions([
      ...savedQuestions.slice(0, index),
      ...savedQuestions.slice(index + 1),
    ]);
    setSelectedQuestionType("mcq"); // Directly set to "mcq"
    setEditingQuestion(updatedQuestion);
  };

  const handleDeleteQuestion = (index) => {
    showConfirmWarning("Are you sure you want to delete this question?", () => {
      setSavedQuestions([
        ...savedQuestions.slice(0, index),
        ...savedQuestions.slice(index + 1),
      ]);
    });
  };

  const handleDeleteMCQRow = (index) => {
    showConfirmWarning("Are you sure you want to delete this MCQ row?", () => {
      const updatedQuestions = [...mcqQuestions];
      updatedQuestions.splice(index, 1);
      setMCQQuestions(updatedQuestions);
      setNumMCQs(mcqQuestions.length - 1);
    });
  };

  const handleCloseQuestionSection = () => {
    showConfirmWarning("Are you sure you want to close this section? Unsaved changes will be lost.", () => {
      setSelectedQuestionType(null);
      setMCQQuestions([]);
      setNumMCQs(0);
    });
  };

  const showConfirmWarning = (message, callback) => {
    setWarningMessage(message);
    setWarningCallback(() => callback);
    setShowWarning(true);
  };

  const showStatementWarning = (message) => {
    setWarningMessage(message);
    setShowWarning(true);
  };

  const confirmWarning = () => {
    if (warningCallback) {
      warningCallback();
    }
    setShowWarning(false);
    setWarningCallback(null);
  };

  const cancelWarning = () => {
    setShowWarning(false);
    setWarningCallback(null);
  };

  return (
    <div className="create-exam-container">
      <h2>Create Exam</h2>
      <form onSubmit={handleExamNameSubmit}>
        <div className="form-group">
          <h3>Enter Exam Name:</h3>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            required
            placeholder="Exam Name"
          />
          <Button type="submit" disabled={!examName}>
            Proceed <BsArrowRight />
          </Button>
        </div>
      </form>

      {showCreateExamSection && (
        <div className="create-exam-section">
          <h3>Add Exam Questions</h3>
          <Dropdown className="w-100">
            <Dropdown.Toggle variant="dark" id="question-type-dropdown">
              Choose Question Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedQuestionType("mcq")}>
                MCQ
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedQuestionType("trueFalse")}>
                True/False
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedQuestionType("written")}>
                Written
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSelectedQuestionType("plot")}>
                Plot
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {selectedQuestionType === "mcq" && (
            <div>
              <Form.Group as={Col} controlId="formGridNumMCQs">
                <Form.Label>Number of MCQs</Form.Label>
                <Form.Control
                  type="number"
                  value={numMCQs}
                  onChange={(e) => setNumMCQs(parseInt(e.target.value))}
                />
              </Form.Group>

              <Button onClick={handleProceed}>Proceed</Button>

              {mcqQuestions.length > 0 && (
                <div className="mcq-questions-table">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>MCQ</th>
                        <th>Weight</th>
                        <th>Correct Answer</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mcqQuestions.map((question, index) => (
                        <tr key={index}>
                          <td>MCQ {index + 1}</td>
                          <td>
                            <Form.Control
                              type="number"
                              value={question.weight}
                              onChange={(e) => {
                                const updatedQuestions = [...mcqQuestions];
                                updatedQuestions[index].weight = parseInt(e.target.value);
                                setMCQQuestions(updatedQuestions);
                              }}
                            />
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle variant="dark" id={`dropdown-${index}`}>
                                {question.correctAnswer ? (
                                  <BsCheckCircleFill />
                                ) : (
                                  <BsCircleFill />
                                )}
                                &nbsp;{question.correctAnswer || "Choose answer"}
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => {
                                    const updatedQuestions = [...mcqQuestions];
                                    updatedQuestions[index].correctAnswer = "A";
                                    setMCQQuestions(updatedQuestions);
                                  }}
                                >
                                  A
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    const updatedQuestions = [...mcqQuestions];
                                    updatedQuestions[index].correctAnswer = "B";
                                    setMCQQuestions(updatedQuestions);
                                  }}
                                >
                                  B
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    const updatedQuestions = [...mcqQuestions];
                                    updatedQuestions[index].correctAnswer = "C";
                                    setMCQQuestions(updatedQuestions);
                                  }}
                                >
                                  C
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => {
                                    const updatedQuestions = [...mcqQuestions];
                                    updatedQuestions[index].correctAnswer = "D";
                                    setMCQQuestions(updatedQuestions);
                                  }}
                                >
                                  D
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteMCQRow(index)}
                            >
                              <BsTrash />
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                const updatedQuestions = [...mcqQuestions];
                                const tempQuestion = updatedQuestions[index];
                                updatedQuestions[index] = updatedQuestions[index - 1];
                                updatedQuestions[index - 1] = tempQuestion;
                                setMCQQuestions(updatedQuestions);
                              }}
                              disabled={index === 0}
                            >
                              <BsArrowUp />
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => {
                                const updatedQuestions = [...mcqQuestions];
                                const tempQuestion = updatedQuestions[index];
                                updatedQuestions[index] = updatedQuestions[index + 1];
                                updatedQuestions[index + 1] = tempQuestion;
                                setMCQQuestions(updatedQuestions);
                              }}
                              disabled={index === mcqQuestions.length - 1}
                            >
                              <BsArrowDown />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Button
                    variant="success"
                    onClick={handleAddNewMCQQuestion}
                    className="float-right"
                  >
                    Add New MCQ Question
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSaveQuestion}
                    className="float-right"
                  >
                    Save MCQ Questions
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleCloseQuestionSection}
                    className="float-right"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          )}

          {savedQuestions.length > 0 && (
            <div className="saved-questions">
              <h3>Saved Questions</h3>
              <ul>
                {savedQuestions.map((question, index) => (
                  <li key={index}>
                    <Card>
                      <Card.Body>
                        <h5>
                          {question.type} Question {index + 1}
                        </h5>
                        <p>
                          Number of questions: {question.numQuestions}
                        </p>
                        <p>
                          Total weight: {question.totalWeight}
                        </p>
                        <Button
                          variant="primary"
                          onClick={() => handleUpdateQuestion(index)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteQuestion(index)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {showWarning && (
        <div
          className="warning-popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            zIndex: 1000,
            border: "1px solid black",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            animation: "fadeInOut 0.3s forwards",
          }}
        >
          <h4>Warning</h4>
          <p>{warningMessage}</p>
          {warningCallback ? (
            <React.Fragment>
              <Button variant="secondary" onClick={cancelWarning} className="mr-2">
                No
              </Button>
              <Button variant="primary" onClick={confirmWarning}>
                Yes
              </Button>
            </React.Fragment>
          ) : (
            <Button variant="primary" onClick={cancelWarning}>
              Close
            </Button>
          )}
        </div>
      )}
      {showWarning && (
        <div
          className="warning-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={cancelWarning}
        />
      )}
    </div>
  );
};

export default CreateExamPage;
