import React from 'react';
import {Link} from 'react-router-dom';

const DiscoverDisplay = (props) => {
  const { usersMeditations, currentlyShowing, activeCourse, activeBadge } = props;
  // console.log(usersMeditations)
  console.log(activeCourse);

  let completedLessons = 0;
  usersMeditations.forEach((meditation) => {
    console.log(meditation.completed);
    if(meditation.courseId === activeCourse.courseId && meditation.completed === false) {
      completedLessons++;
    }
  })

  return (
    <>
      {(currentlyShowing === "courses") ? (
        <>
          <h1>{activeCourse.name}</h1>
          <p>Duration: {activeCourse.duration}</p>
          <p>Completed lessons: 
            {completedLessons}
            /{activeCourse.totalLessons} 
          </p>
          <Link className="picture-content" to={`/my/discover/${activeCourse.id}`}>
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