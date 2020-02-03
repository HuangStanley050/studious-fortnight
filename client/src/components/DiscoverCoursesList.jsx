import React from 'react';

const DiscoverCoursesList = ({currentlyShowing, activeCourse, courses, setTheCourseDisplay}) => {
  return (
    <>
    {courses.map((course) => {
      const {id, name} = course;
      if (activeCourse.name === name && currentlyShowing === "courses") {
        return (
          <h6 key={id} className="course-link-active" onClick={setTheCourseDisplay} value={name}>
            <i className="fas fa-angle-double-right"></i>
            &nbsp;
            {name}
          </h6>
      )
      } else {
        return (
          <h6 key={id} className="course-link" onClick={setTheCourseDisplay} value={name}>
            <i className="fas fa-angle-right"></i>
            &nbsp;
            {name}
          </h6>
      )
      }
    })}
    </>
  );
};

export default DiscoverCoursesList;