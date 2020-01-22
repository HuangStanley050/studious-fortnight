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
  useEffect(() => {
    //get users courses data
    const fetchUsersCoursesData = () => {
      console.log(API.courseData);
      return axios
        .get(API.courseData, {
          body: { userId: loggedInUserId }
        })
        .then(data => data);
      //setUsersCourses(response.data);
    };
    fetchUsersCoursesData()
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));

    //get users meditation data
    const fetchUsersMeditationData = () => {
      console.log(API.meditationData);
      return axios
        .get(API.meditationData, {
          body: { userId: loggedInUserId }
        })
        .then(result => result);
      //setUsersMeditations(response.data);
    };
    fetchUsersMeditationData()
      .then(result => console.log(result))
      .catch(err => console.log(err));

    //fetch badge data
  }, [loggedInUserId, usersCourses]);

  // useEffect(() => {
  //   usersCourses.forEach(course => {
  //     if (
  //       activeCourse.name.toLowerCase() ===
  //       course.courseDetail.difficulty.toLowerCase()
  //     ) {
  //       const fixedCourse = {
  //         ...activeCourse,
  //         courseId: course._id
  //       };
  //       setCourse(fixedCourse);
  //     }
  //   });
  // }, [activeCourse, usersCourses]);

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
