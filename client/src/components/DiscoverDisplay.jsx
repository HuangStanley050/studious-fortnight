import React from 'react';
import {Link} from 'react-router-dom';
import DiscoverDisplayStatus from './DiscoverDisplayStatus.jsx';

const DiscoverDisplay = (props) => {
  const { usersMeditations, currentlyShowing, activeCourse, activeBadge } = props;

  let completedLessons = 0;
  usersMeditations.forEach((meditation) => {
    if(meditation.courseId === activeCourse.courseId && meditation.completed === true) {
      completedLessons++;
    }
  })

  return (
    <>
      {(currentlyShowing === "courses") ? (
        <>
          <h1>{activeCourse.name}</h1>
          <p>Duration: {activeCourse.duration}</p>
          <DiscoverDisplayStatus completedLessons={completedLessons} activeCourse={activeCourse} />
          <Link className="picture-content" to={`/my/discover/${activeCourse.id}`}>
            <img className="course-image" src={activeCourse.image_url} alt="" />
          </Link>
        </>
      ) : (
      <>
        <h1>{activeBadge.name}</h1>
        <p>Description: {activeBadge.description}</p>
        <img className="badge-image" src={activeBadge.image_url} alt="" />
      </>
    )}
  </>
  )
}

export default DiscoverDisplay;