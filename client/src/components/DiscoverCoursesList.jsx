import React from 'react';

const DiscoverCoursesList = ({courses, setTheCourseDisplay}) => {
  // console.log(courses)

  return (
    <>
    {courses.map((course) => {
      const {id, name} = course;
      return (
          <h6 key={id} className="course-link" onClick={setTheCourseDisplay} value={name}>- {name}</h6>
      )
    })}
    </>
  );
};

export default DiscoverCoursesList;