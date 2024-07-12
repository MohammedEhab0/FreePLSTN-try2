import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DUMMY_Exams } from "../../data.js";
import Examicon from "../../images/ExamIcon.png";
import "./Dashboard.css";

const Dashboard = () => {
  const [Exams, setExams] = useState(DUMMY_Exams);

  return (
    <>
      <div className="container">
        <div>
          <Link to="/create-exam">
            <button className="addButton">+ Create</button>
          </Link>
        </div>

        {Exams.length > 0 ? (
          <div className="dashboard-container">
            {Exams.map((Exam) => (
              <div className="Exam-container">
                <Link to="/upload-exam">
                  <h2>{Exam.Title}</h2>
                  <div className="Des-img">
                    <img src={Examicon} />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="Exam-container">
            <p>No courses Founded</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
