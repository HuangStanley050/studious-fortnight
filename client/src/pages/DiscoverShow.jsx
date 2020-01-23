import React, {useState, useEffect} from 'react';
import "./DiscoverShow.scss";
//courses data:
import courses from "../dummyData/courses";
import axios from 'axios';
import API from "../api";
import { response } from 'express';

//get the "DAY 1 OF BEGINNER" thing to be dynamically coded

const DiscoverShow = (props) => {
  const [viewSessions, setViewSessions] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [sessions, setSessions] = useState([]);
  //course id from the URL:
  const {id} = props.match.params;
  //course data: 
  const course = courses.find((course) => course.id == id);

  // console.log(course.name, "<==course dummy")

  //api call to find users course if it exists
  useEffect(() => {
    const fetchUsersCourseData = async () => {
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.courseData
      }); 

      response.data.map((userCourse) => {
        const usersCourse = userCourse.courseDetail.difficulty;
        if( usersCourse.toLowerCase() == course.name.toLowerCase()) {
          // console.log(usersCourse, "match!")
          setIsStarted(true);
        }
      });
    }
    fetchUsersCourseData();

    const fetchSessionData = async () => {
      const token = localStorage.getItem("CMCFlow");
      const responseMeditation = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.meditationData
      }); 
      console.log(responseMeditation.data);
      //only push relevant sessions
      //first get courseData
      const responseCourse = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.courseData
      });
      console.log(responseCourse.data);

      let usersCourseId = "";

      // responseCourse.data.forEach((theCourse) => {
      //   // console.log(theCourse.courseDetail.difficulty)
      //   // console.log(course.name)
      //   if(theCourse.courseDetail.difficulty.toLowerCase() === course.name.toLowerCase()) {
      //     usersCourseId = theCourse._id;
      //     console.log(theCourse._id, "<== course Id")

      //     //set sessions that are of the right course only
      //     // let sessionsToSet = [];
      //     // responseMeditation.data.forEach((meditation) => {
      //     //   if(meditation.courseId === theCourse._id) {
      //     //     console.log("hmm")
      //     //   }
      //     // })
      //   } else {
      //     //user hasn't started this course yet
      //     console.log("user hasnt started course");
      //   }
      // })

      setSessions(responseMeditation.data);
    }
    fetchSessionData();
  }, []);

  const showSessions = () => {
    setViewSessions(!viewSessions);
  }

  const addToMyCourses = (e) => {
    //logic to add to course here. API call post! 
  }

  const playCourse = () => {
    //logic to go to course (it already exists)
    //logic to go to set the "current" course, first incompleted meditation of that course.
    // i.e. something like this:
    props.history.push("/my");
  }

  const startCourse = (e) => {
    //first add course 
    addToMyCourses();
    playCourse()
  }

  return (
    <>
    <div className="discover-show-content">
      <div className="info-content">
        <h1>{course.name}</h1>
        {/* <p>{isStarted ? "started" : "not started"}</p> */}
        <p>{course.totalLessons} lessons</p>
        <p>{course.description}</p>

        {/* if course has been started, render continue button. if it hasn't, render add button */}
        { isStarted ? 
          <div className="add-button" onClick={playCourse}>
            <i className="far fa-plus-square fa-3x"></i>
            &nbsp; CONTINUE
          </div>
          : 
            <div className="add-button" onClick={addToMyCourses}>
              <i className="far fa-plus-square fa-3x"></i>
              &nbsp; ADD TO MY COURSES
            </div>
        }
      </div>

      <div className="picture-content">
        <img src={course.image_url}></img>
      </div>
    </div>
  
    <div className="display-sessions">
      <div className="session-button">
        <i 
          className="far fa-caret-square-down fa-3x"
          onClick={showSessions}
        ></i>
        &nbsp; VIEW SESSIONS
      </div>
      {viewSessions ? 
        sessions.map((session, index) => {
          return (
            <div className="session" key={index+1}>
              <span>
                {session.completed == true ?
                  <i className="far fa-check-square"></i>
                :
                  <i className="far fa-caret-square-right"></i>
                }
                Session {index + 1}
              </span>
              <div>
                <span>Duration: {session.sessionDetail.currentTime} / {session.sessionDetail.totalTime}</span>
              </div>
            </div>
          )
        })
      : 
        ""
      } 
    </div>

    <div className="discover-show-footer">
      <div className="begin-button" onClick={startCourse}>BEGIN</div>
      <div className="time-button" onClick={startCourse}>{course.duration.toUpperCase()}</div>
      <div className="title">DAY 1 OF {course.name.toUpperCase()}</div>
    </div>

    </>
  );
};

export default DiscoverShow;