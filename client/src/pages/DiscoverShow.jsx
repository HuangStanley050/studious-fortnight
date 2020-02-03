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
import { updateMeditation } from "../store/actions/meditationActions";
import { connect } from "react-redux";
import Loader from "../components/Loader";

const DiscoverShow = props => {
  const [viewSessions, setViewSessions] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  //course id from the URL:
  const { id } = props.match.params;
  //course data:
  const course = courses.find(course => course.id === id); //needs to be only == not ===

  //api call to find users course if it exists
  useEffect(() => {
    setIsLoading(true);
    fetchUsersCourseData(course, setIsStarted, setIsDisabled);
    fetchSessionData(course, setSessions);
    setIsLoading(false);

    if (isStarted) {
      setIsDisabled(false);
    }
  }, [course, isStarted]);

  const showSessions = () => {
    setViewSessions(!viewSessions);
  };

  const addToMyCourses = async () => {
    //logic to add to course here. API call post!
    const token = localStorage.getItem("CMCFlow");
    setIsLoading(true);
    const response = await axios({
      headers: { Authorization: `bearer ${token}` },
      data: { courseName: course.name.toLowerCase() },
      method: "post",
      url: API.addCourse
    });

    if (response.data) {
      setIsStarted(true);
    }

    setIsLoading(false);
  };

  const goHomeToPlay = () => {
    props.history.push("/my");
  };

  const updateTheCurrentMeditation = async meditationId => {
    //api call which updates users currentMeditation
    const token = localStorage.getItem("CMCFlow");
    setIsLoading(true);
    await axios({
      headers: { Authorization: `bearer ${token}` },
      data: { meditationId: meditationId },
      method: "post",
      url: API.updateCurrentMeditation
    });
    props.updateMeditation();
    setIsLoading(false);
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="discover-show-content">
            <div className="info-content">
              <h1>{course.name}</h1>

              <p>{course.totalLessons} lessons</p>
              <div>
                {course.description}
                {isDisabled && (
                  <div className="unlock-message">
                    Complete your current course to unlock.
                  </div>
                )}
              </div>

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
                  {isDisabled ? (
                    <>
                      <i className="far fa-plus-square fa-3x"></i>
                      &nbsp; LOCKED
                    </>
                  ) : (
                    <>
                      <i
                        className="far fa-plus-square fa-3x"
                        onClick={addToMyCourses}
                      ></i>
                      &nbsp; ADD TO MY COURSES
                    </>
                  )}
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
                {isDisabled ? (
                  <>
                    <div className="begin-button">LOCKED</div>
                    <div className="time-button">
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
              </>
            )}

            <div className="title">DAY 1 OF {course.name.toUpperCase()}</div>
          </div>
        </>
      )}
    </>
  );
};
const mapDispatch = dispatch => ({
  updateMeditation: () => dispatch(updateMeditation(true))
});
export default connect(
  null,
  mapDispatch
)(DiscoverShow);
