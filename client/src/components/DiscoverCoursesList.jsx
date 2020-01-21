import React from 'react';

const DiscoverCoursesList = (props) => {
  return (
    <>
    {props.courses.map((course) => {
      return (
          <h6 key={course.id} className="course-link" onClick={props.setTheCourseDisplay} value={course.name}>- {course.name}</h6>
      )
    })}
    </>
  );
};

export default DiscoverCoursesList;