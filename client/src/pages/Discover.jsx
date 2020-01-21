import React, {useState} from 'react';
import './Discover.scss';
import DiscoverCoursesList from '../components/DiscoverCoursesList.jsx';
import DiscoverBadgesList from '../components/DiscoverBadgesList.jsx';
import DiscoverDisplay from '../components/DiscoverDisplay.jsx';

//api call to discover all available courses, hard coded for now:
import courses from "../dummyData/courses";
//api call to discover all available badges, hard coded for now:
import badges from "../dummyData/badges";

const Discover = () => {
  //set currentlyShowing hardcoded to beginner
  const [currentlyShowing, setShowing] = useState("courses");
  //set activeCourse hardcoded to beginner
  const [activeCourse, setCourse] = useState(courses[0]);
  //set activeBadge hardcoded to "Journey starter"
  const [activeBadge, setBadge] = useState(badges[0]);

  const setTheCourseDisplay = (e) => {
    setShowing("courses");
    const setTo = e.currentTarget.getAttribute("value");
    const findCourse = courses.find((course) => course.name === setTo);
    setCourse(findCourse);
  }

  const setTheBadgeDisplay = (e) => {
    setShowing("badges");
    const setTo = e.currentTarget.getAttribute("value");
    const findBadge = badges.find((badge) => badge.name === setTo);
    setBadge(findBadge);
  }

  //calculate how many badges are unlocked:
  let unlocked = 0;
  for(let i = 0; i < badges.length - 1; i++) {
    if(badges[i].unlocked === true) {
      unlocked++;
    };
  }

  return (
    <div className="discover-content">
      <div className="left-select-content">
        <h2>Courses</h2>
        <DiscoverCoursesList 
          courses={courses} 
          setTheCourseDisplay={setTheCourseDisplay} 
        />

        <br />
        <h2>Badges</h2>
        <p>Unlocked: {unlocked} / {badges.length} </p>
        {badges.length > unlocked ? 
          <p>Keep meditating to unlock more badges!</p> : 
          <p>You unlocked all the badges, congrats!</p>
        }
        <DiscoverBadgesList 
          badges={badges} 
          setTheBadgeDisplay={setTheBadgeDisplay} 
        />
      </div>

      <div className="right-display-content">
        <DiscoverDisplay 
          activeCourse={activeCourse} 
          activeBadge={activeBadge} 
          currentlyShowing={currentlyShowing}
        />
      </div>
    </div>
  )
}

export default Discover;