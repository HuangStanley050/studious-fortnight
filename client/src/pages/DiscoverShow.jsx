import React, { useState, useEffect } from "react";
import "./DiscoverShow.scss";
//courses data:
import courses from "../dummyData/courses";
import axios from "axios";
import API from "../api";
import {
  fetchSessionData,
  fetchUsersCourseData
} from "../components/fetchForDiscoverShow.js";

const DiscoverShow = props => {
  const [viewSessions, setViewSessions] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [sessions, setSessions] = useState([]);

  //course id from the URL:
  const { id } = props.match.params;
  //course data:
  const course = courses.find(course => course.id === id); //needs to be only == not ===

  //api call to find users course if it exists
  useEffect(() => {
    fetchUsersCourseData(course, setIsStarted);
    fetchSessionData(course, setSessions);
  }, [course, isStarted]);

  const showSessions = () => {
    setViewSessions(!viewSessions);
  };

  const addToMyCourses = async () => {
    //logic to add to course here. API call post!
    const token = localStorage.getItem("CMCFlow");
    const response = await axios({
      headers: { Authorization: `bearer ${token}` },
      data: { courseName: course.name.toLowerCase() },
      method: "post",
      url: API.addCourse
    });

    if (response.data) {
      await setIsStarted(true);
    }
  };

  const goHomeToPlay = () => {
    props.history.push("/my");
  };

  const updateTheCurrentMeditation = async meditationId => {
    //api call which updates users currentMeditation
    const token = localStorage.getItem("CMCFlow");
    await axios({
      headers: { Authorization: `bearer ${token}` },
      data: { meditationId: meditationId },
      method: "post",
      url: API.updateCurrentMeditation
    });
  };

  const setCurrentMeditation = async e => {
    const sessionIndex = e.currentTarget.getAttribute("value");
    const meditationId = sessions[sessionIndex]._id;

    await updateTheCurrentMeditation(meditationId);
    goHomeToPlay();
  };

  const playCourse = () => {
    // //logic to go to course (it already exists)
    // iterate through sessions, find the first one that isn't completed, set that to completed course then redirect to home
    let meditationId = sessions[0]._id;
    sessions.forEach(session => {
      if (session.completed === true) {
        meditationId = session._id;
      }
    });
    updateTheCurrentMeditation(meditationId);
    goHomeToPlay();
  };

  return (
    <>
      <div className="discover-show-content">
        <div className="info-content">
          <h1>{course.name}</h1>
          {/* <p>{isStarted ? "started" : "not started"}</p> */}
          <p>{course.totalLessons} lessons</p>
          <p>{course.description}</p>

          {/* if course has been started, render continue button. if it hasn't, render add button */}
          {isStarted ? (
            <div className="add-button">
              <i
                className="far fa-plus-square fa-3x"
                value={course.name}
                onClick={playCourse}
              ></i>
              &nbsp; CONTINUE
            </div>
          ) : (
            <div className="add-button">
              <i
                className="far fa-plus-square fa-3x"
                onClick={addToMyCourses}
              ></i>
              &nbsp; ADD TO MY COURSES
            </div>
          )}
        </div>

        <div className="picture-content">
          <img src={course.image_url} alt=""></img>
        </div>
      </div>

      {/* if user has started this course and has sessions, show view sessions drop down. if they don't, dont show it */}
      {sessions.length !== 0 ? (
        // "got sessions"
        <div className="display-sessions">
          <div className="session-button">
            <i
              className="far fa-caret-square-down fa-3x"
              onClick={showSessions}
            ></i>
            &nbsp; VIEW SESSIONS
          </div>
          {viewSessions
            ? sessions.map((session, index) => {
                return (
                  <div className="session" key={index + 1}>
                    <span>
                      {session.completed === true ? (
                        <i className="far fa-check-square"></i>
                      ) : (
                        <i
                          className="far fa-caret-square-right"
                          value={index}
                          onClick={setCurrentMeditation}
                        ></i>
                      )}
                      Session {index + 1}
                    </span>
                    <div>
                      <span>
                        Duration: {session.sessionDetail.currentTime} /{" "}
                        {session.sessionDetail.totalTime}
                      </span>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      ) : (
        // "no sesh"
        ""
      )}

      <div className="discover-show-footer">
        {isStarted ? (
          <>
            <div className="begin-button" onClick={playCourse}>
              CONTINUE
            </div>
            <div className="time-button" onClick={playCourse}>
              {course.duration.toUpperCase()}
            </div>
          </>
        ) : (
          <>
            <div className="begin-button" onClick={addToMyCourses}>
              BEGIN
            </div>
            <div className="time-button" onClick={addToMyCourses}>
              {course.duration.toUpperCase()}
            </div>
          </>
        )}

        <div className="title">DAY 1 OF {course.name.toUpperCase()}</div>
      </div>
    </>
  );
};

export default DiscoverShow;
