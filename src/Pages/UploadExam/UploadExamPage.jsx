import React, { useState, useEffect } from "react";
import { FaFileUpload } from "react-icons/fa";
import "./UploadExam.css";
import { Link } from "react-router-dom";

const examData = {
  exam: [{ id: 1, name: "ex", mcq_number: 10, tf_number: 10 }],
};

const UploadExamPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [mainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [subDropdownOpen1, setSubDropdownOpen1] = useState(false);
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [subDropdownOpen2, setSubDropdownOpen2] = useState(false);
  const [tfQuestions, setTfQuestions] = useState([]);
  const [forcedQuestions, setForcedQuestions] = useState({
    forced_mcq_points: [],
    forced_tf_points: [],
  });

  useEffect(() => {
    const exam = examData.exam[0];
    const mcqQuestionsArray = Array.from(
      { length: exam.mcq_number },
      (_, index) => `MCQ ${index + 1}`
    );
    setMcqQuestions(mcqQuestionsArray);

    const tfQuestionsArray = Array.from(
      { length: exam.tf_number },
      (_, index) => `TF ${index + 1}`
    );
    setTfQuestions(tfQuestionsArray);
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setUploading(true);
    setUploadError(null);

    // Simulate upload process (just for demo purposes)
    setTimeout(() => {
      const updatedFiles = uploadedFiles.map((file) => ({
        name: file.name,
        status: "Uploaded successfully",
      }));
      setUploadedFiles(updatedFiles);
      setUploading(false);
    }, 2000); // simulate 2-second upload process
  };

  const handleMainDropdownClick = () => {
    setMainDropdownOpen(!mainDropdownOpen);
  };

  const handleSubDropdownClick1 = () => {
    setSubDropdownOpen1(!subDropdownOpen1);
  };

  const handleSubDropdownClick2 = () => {
    setSubDropdownOpen2(!subDropdownOpen2);
  };

  const handleCheckboxChange = (questionType, questionNumber) => {
    setForcedQuestions((prev) => {
      const key = `forced_${questionType}_points`;
      const currentPoints = prev[key];
      const updatedPoints = currentPoints.includes(questionNumber)
        ? currentPoints.filter((q) => q !== questionNumber)
        : [...currentPoints, questionNumber];

      return {
        ...prev,
        [key]: updatedPoints,
      };
    });
  };

  return (
    <div className="upload-exam-container">
      <h2>Upload Exam</h2>
      <p>Instructions: Ensure the exam photos are clear and readable.</p>
      <form onSubmit={handleUpload}>
        <div className="upload-form">
          <label htmlFor="examImages">Upload Exam</label>
          <FaFileUpload size={24} />
          <input
            type="file"
            id="examImages"
            name="examImages"
            multiple
            required
            onChange={handleFileChange}
          />

          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="mainDropdownMenuButton"
              aria-haspopup="true"
              aria-expanded={mainDropdownOpen}
              onClick={handleMainDropdownClick}
            >
              Select Questions
            </button>
            <div
              className={`dropdown-menu ${mainDropdownOpen ? "show" : ""}`}
              aria-labelledby="mainDropdownMenuButton"
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="dropdown">
                <button
                  className="dropdown-item"
                  type="button"
                  id="subDropdownMenuButton1"
                  aria-haspopup="true"
                  aria-expanded={subDropdownOpen1}
                  onClick={handleSubDropdownClick1}
                >
                  MCQ Questions
                </button>
                <div
                  className={`dropdown-menu ${subDropdownOpen1 ? "show" : ""}`}
                  aria-labelledby="subDropdownMenuButton1"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {mcqQuestions.map((question, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("mcq", index + 1)}
                        checked={forcedQuestions.forced_mcq_points.includes(
                          index + 1
                        )}
                      />
                      {question}
                    </li>
                  ))}
                </div>
              </div>
              <div className="dropdown">
                <button
                  className="dropdown-item"
                  type="button"
                  id="subDropdownMenuButton2"
                  aria-haspopup="true"
                  aria-expanded={subDropdownOpen2}
                  onClick={handleSubDropdownClick2}
                >
                  True/False Questions
                </button>
                <div
                  className={`dropdown-menu ${subDropdownOpen2 ? "show" : ""}`}
                  aria-labelledby="subDropdownMenuButton2"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {tfQuestions.map((question, index) => (
                    <li key={index}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange("tf", index + 1)}
                        checked={forcedQuestions.forced_tf_points.includes(
                          index + 1
                        )}
                      />
                      {question}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {uploading ? "Uploading..." : "Upload Exam"}
        </button>
        <p>Forced MCQ Points: {forcedQuestions.forced_mcq_points.join(", ")}</p>
        {uploadError && <div className="alert alert-danger">{uploadError}</div>}
        {uploadedFiles.length > 0 && (
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                {file.name} - {file.status}
              </li>
            ))}
          </ul>
        )}
        <Link to="/grade-exams">
          <button>go Grade Exam</button>
        </Link>
      </form>
    </div>
  );
};

export default UploadExamPage;
