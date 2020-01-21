import React from 'react';
import {Link} from 'react-router-dom';

const DiscoverDisplay = (props) => {
  const {currentlyShowing, activeCourse, activeBadge} = props;
  return (
    <>
      {(currentlyShowing === "courses") ? (
        <>
          <h1>{activeCourse.name}</h1>
          <p>Duration: {activeCourse.duration}</p>
          <p>Completed lessons: {activeCourse.completedLessons}/{activeCourse.totalLessons}</p>
          <Link to={`/my/discover/${activeCourse.id}`}>
            <img className="course-image" src={activeCourse.image_url} />
          </Link>
        </>
      ) : (
      <>
        <h1>{activeBadge.name}</h1>
        <p>Description: {activeBadge.description}</p>
        <img className="badge-image" src={activeBadge.image_url} />
      </>
    )}
  </>
  )
}

export default DiscoverDisplay;