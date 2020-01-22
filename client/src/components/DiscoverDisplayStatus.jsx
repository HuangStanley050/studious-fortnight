import React from 'react';

const DiscoverDisplayStatus = ({completedLessons, activeCourse}) => {
  if(completedLessons === activeCourse.totalLessons) {
    return (
      <>
        <h6>Course finished</h6>
        <p>Completed {completedLessons} sessions.</p>
      </>
    );
  } else if (activeCourse.courseId !== "") {
    return (
      <>
        <h6>Course started</h6>
        <p>{completedLessons} of {activeCourse.totalLessons}</p>
      </>
    );
  } else {
    return (
      <>
        <h6>Course not started</h6>
        <p>{activeCourse.totalLessons} lessons.</p>
      </>
    );
  };
};

export default DiscoverDisplayStatus;