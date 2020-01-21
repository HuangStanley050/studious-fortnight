import React from 'react';
import "./DiscoverShow.scss";
//dummy data used for now:
import courses from "../dummyData/courses";

const DiscoverShow = (props) => {
  // console.log(props.match.params.id)
  const {id} = props.match.params;

  //api call or call to store, dumym data for now: 
  const course = courses.find((course) => course.id == id);

  const addToMyCourses = (e) => {
    //logic to add to course here. API call! 
  }

  const startCourse = (e) => {
    //first add course 
    addToMyCourses();
    //then redirect to start course
    //something like this?
    props.history.push("/my"); //and somehow auto-play?
  }

  return (
    <>
    <div className="discover-show-content">
      <div className="info-content">
        <h1>{course.name}</h1>
        <p>{course.lessons} lessons</p>
        <p>{course.description}</p>
        <div className="add-button" onClick={addToMyCourses}>
          <i class="far fa-plus-square fa-3x"></i>
          &nbsp; ADD TO MY COURSES
        </div>
      </div>

      <div className="picture-content">
        <img src={course.image_url}></img>
      </div>
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