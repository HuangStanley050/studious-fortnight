import React, { useState, useEffect } from "react";
import "./Discover.scss";
import DiscoverCoursesList from "../components/DiscoverCoursesList.jsx";
import DiscoverBadgesList from "../components/DiscoverBadgesList.jsx";
import DiscoverDisplay from "../components/DiscoverDisplay.jsx";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";

//discover all available courses, hard coded:
import courses from "../dummyData/courses";
import API from "../api";

export const Discover = ({ user }) => {
  // const loggedInUserId = user.id;
  const [usersCourses, setUsersCourses] = useState([]);
  const [usersMeditations, setUsersMeditations] = useState([]);
  const [usersBadges, setUsersBadges] = useState([]);

  //set currentlyShowing hardcoded to courses
  const [currentlyShowing, setShowing] = useState("courses");
  //set activeCourse hardcoded to beginner
  const [activeCourse, setCourse] = useState(courses[0]);
  //set activeBadge hardcoded to "Journey starter"
  const [activeBadge, setBadge] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //fetch users info from API:
  useEffect(() => {
    //check / update badges: 
    const checkBadges = async () => {
      const token = localStorage.getItem("CMCFlow");
      setIsLoading(true);
      await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.checkBadges
      });
      setIsLoading(false);
    }
    checkBadges();
    //get users course data
    const fetchUsersCoursesData = async () => {
      const token = localStorage.getItem("CMCFlow");
      setIsLoading(true);
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.courseData
      });
      setUsersCourses(response.data);
      setIsLoading(false);
    }
    fetchUsersCoursesData();
    //get users meditation data
    const fetchUsersMeditationData = async () => {
      const token = localStorage.getItem("CMCFlow");
      setIsLoading(true);
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.meditationData
      });
      // set the state here
      setUsersMeditations(response.data);
      setIsLoading(false);
    };
    fetchUsersMeditationData();
    //fetch users badge data
    const fetchUsersBadgeData = async () => {
      const token = localStorage.getItem("CMCFlow");
      setIsLoading(true);
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.badgeData
      }); 
      setUsersBadges(response.data);
      setIsLoading(false);
    }
    fetchUsersBadgeData();
  }, []);

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
  }, [usersCourses, usersBadges]);

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
    const findBadge = usersBadges.find(badge => badge.name === setTo);
    setBadge(findBadge);
  };

  //calculate how many badges are unlocked:
  let unlocked = 0;
  for (let i = 0; i < usersBadges.length - 1; i++) {
    if (usersBadges[i].unlocked === true) {
      unlocked++;
    }
  }

  return (
    <div className="discover-content">
      {isLoading ? 
        <Loader /> 
      : 
      <>
        <div className="left-select-content">
          <h2>Courses</h2>
          {/* <p>Active course id: {activeCourse.courseId} </p>  */}
          <DiscoverCoursesList
            currentlyShowing={currentlyShowing}
            activeCourse={activeCourse}
            courses={courses}
            usersMeditations={usersMeditations}
            setTheCourseDisplay={setTheCourseDisplay}
          />

          <br />
          <h2>Badges</h2>
          <p>Unlocked: {unlocked} / {usersBadges.length} </p>
          {usersBadges.length > unlocked ? 
            <p>Keep meditating to unlock more badges!</p> : 
            <p>You unlocked all the badges, congrats!</p>
          }
          <DiscoverBadgesList
            currentlyShowing={currentlyShowing}
            activeBadge={activeBadge}
            badges={usersBadges}
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
      </>
      
      }
    </div>
  );
};

const mapState = state => ({
  user: state.auth.userInfo
});
export default connect(mapState)(Discover);
