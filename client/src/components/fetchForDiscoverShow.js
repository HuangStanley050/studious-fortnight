import axios from "axios";
import API from "../api";

export const fetchSessionData = async (course, setSessions) => {
  const token = localStorage.getItem("CMCFlow");
  const responseMeditation = await axios({
    headers: { Authorization: `bearer ${token}` },
    method: "get",
    url: API.meditationData
  });
  // console.log(responseMeditation.data, "<== list of all meditations");
  //only push relevant sessions
  //first get courseData
  const responseCourse = await axios({
    headers: { Authorization: `bearer ${token}` },
    method: "get",
    url: API.courseData
  });
  // console.log(responseCourse.data, "<==list of all courses");

  let usersCourseId = "";

  responseCourse.data.forEach(theCourse => {
    if (
      theCourse.courseDetail.difficulty.toLowerCase() ===
      course.name.toLowerCase()
    ) {
      usersCourseId = theCourse._id;
      // console.log(theCourse._id, "<== course Id")
    } else {
      //user hasn't started this course yet
      // console.log("user hasnt started course");
    }
  });

  if (usersCourseId !== "") {
    const usersSessions = responseMeditation.data.filter(
      session => session.courseId === usersCourseId
    );
    setSessions(usersSessions);
  }
};
export const fetchUsersCourseData = async (course, setIsStarted, setIsDisabled) => {
  const token = localStorage.getItem("CMCFlow");
  const response = await axios({
    headers: { Authorization: `bearer ${token}` },
    method: "get",
    url: API.courseData
  });

  const coursesStarted = response.data.length;
  let coursesCompleted = 0;
  response.data.map(userCourse => {
    const usersCourse = userCourse.courseDetail.difficulty;
    if (usersCourse.toLowerCase() === course.name.toLowerCase()) {
      // console.log(usersCourse, "match!")
      setIsStarted(true);
    }
    //logic for working out if courses are completed: 
    if (userCourse.courseDetail.completed === true) {
      coursesCompleted++;
    }
    return null;
  });

  if (coursesCompleted === coursesStarted) {
    setIsDisabled(false);
  }
};
