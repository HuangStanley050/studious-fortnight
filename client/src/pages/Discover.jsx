import React, { useState, useEffect } from "react";
import "./Discover.scss";
import DiscoverCoursesList from "../components/DiscoverCoursesList.jsx";
import DiscoverBadgesList from "../components/DiscoverBadgesList.jsx";
import DiscoverDisplay from "../components/DiscoverDisplay.jsx";
import { connect } from "react-redux";
import axios from "axios";

// //api call to discover all available courses, hard coded for now:
import courses from "../dummyData/courses";
// //api call to discover all available badges, hard coded for now:
import badges from "../dummyData/badges";
import API from "../api";

// Need to work out how many meditation sessions are completed in a course, and pass them down into discover discoverDisplay!

const Discover = ({ user }) => {
  const loggedInUserId = user.id;

  const [usersCourses, setUsersCourses] = useState([]);
  const [usersMeditations, setUsersMeditations] = useState([]);
  const [usersbadges, setUsersBadges] = useState([]);

  //set currentlyShowing hardcoded to beginner
  const [currentlyShowing, setShowing] = useState("courses");
  //set activeCourse hardcoded to beginner
  const [activeCourse, setCourse] = useState(courses[0]);
  //set activeBadge hardcoded to "Journey starter"
  const [activeBadge, setBadge] = useState(badges[0]);

  //used to get actual users stuff:

  //get users meditation data	    //get users meditation data

  /******

  Two data fetch calls are very similar we might be able to refactor into one function or use Promise.all[] inside that function to resolve the two promises

  Again looking at this, we need redux to keep all data available because at home page we need to have some meditation data and if we were to keep all data here, we won't be able to pass data to Home page to show that meditation session.
 **/

  useEffect(() => {
    //get users courses data
    //setUsersCourses(response.data);
    //get users meditation data
    //setUsersMeditations(response.data);
    //fetch badge data

    const fetchUsersCoursesData = async () => {
      const token = localStorage.getItem("CMCFlow");
      console.log(token);
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.courseData
      });
      console.log(response.data);
      // this is where you do your set state
    };
    const fetchUsersMeditationData = async () => {
      const token = localStorage.getItem("CMCFlow");
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.meditationData
      });
      console.log(response.data);
      // set the state here
    };
    fetchUsersCoursesData();
    fetchUsersMeditationData();
  }, [loggedInUserId, usersCourses]);

  useEffect(() => {
    usersCourses.forEach(course => {
      if (
        activeCourse.name.toLowerCase() ===
        course.courseDetail.difficulty.toLowerCase()
      ) {
        const fixedCourse = {
          ...activeCourse,
          courseId: course._id
        };
        setCourse(fixedCourse);
      }
    });
  }, [activeCourse, usersCourses]);

  const setTheCourseDisplay = async e => {
    setShowing("courses");
    const setTo = e.currentTarget.getAttribute("value");
    const findCourse = courses.find(course => course.name === setTo);
    setCourse(findCourse);

    usersCourses.forEach(course => {
      if (
        findCourse.name.toLowerCase() ===
        course.courseDetail.difficulty.toLowerCase()
      ) {
        const fixedCourse = {
          ...findCourse,
          courseId: course._id
        };
        setCourse(fixedCourse);
      }
    });
  };

  const setTheBadgeDisplay = e => {
    setShowing("badges");
    const setTo = e.currentTarget.getAttribute("value");
    const findBadge = badges.find(badge => badge.name === setTo);
    setBadge(findBadge);
  };

  //calculate how many badges are unlocked:
  let unlocked = 0;
  for (let i = 0; i < badges.length - 1; i++) {
    if (badges[i].unlocked === true) {
      unlocked++;
    }
  }

  return (
    <div className="discover-content">
      <div className="left-select-content">
        <h2>Courses</h2>
        {/* <p>Active course id: {activeCourse.courseId} </p> */}
        <DiscoverCoursesList
          courses={courses}
          usersMeditations={usersMeditations}
          setTheCourseDisplay={setTheCourseDisplay}
        />

        <br />
        <h2>Badges</h2>
        <p>
          Unlocked: {unlocked} / {badges.length}{" "}
        </p>
        {badges.length > unlocked ? (
          <p>Keep meditating to unlock more badges!</p>
        ) : (
          <p>You unlocked all the badges, congrats!</p>
        )}
        <DiscoverBadgesList
          badges={badges}
          setTheBadgeDisplay={setTheBadgeDisplay}
        />
      </div>

      <div className="right-display-content">
        <DiscoverDisplay
          usersMeditations={usersMeditations}
          activeCourse={activeCourse}
          activeBadge={activeBadge}
          currentlyShowing={currentlyShowing}
        />
      </div>
    </div>
  );
};

const mapState = state => ({
  user: state.auth.userInfo
});
export default connect(mapState)(Discover);
