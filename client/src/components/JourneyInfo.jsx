import React from 'react';
import moment from 'moment';

const JourneyInfo = ({item}) => {
  const totalTime = item.sessionDetail.totalTime;
  switch (totalTime) {
    case 180:
      return (
        <>
          <div className="info">
            <h4>Beginner</h4>
            <p>Completed level {item.sessionDetail.level} of 3</p>
          </div>
          <div className="date">
              {moment(item.updatedAt).format("MMM D")}
          </div>
        </>
      )
    case 300:
      return (
        <>
          <div className="info">
            <h4>Intermediate</h4>
            <p>Completed level {item.sessionDetail.level} of 4</p>
          </div>
          <div className="date">
              {moment(item.updatedAt).format("MMM D")}
          </div>
        </>
      )
    case 600:
      return (
        <>
          <div className="info">
            <h4>Expert</h4>
            <p>Completed level {item.sessionDetail.level} of 5</p>
          </div>
          <div className="date">
              {moment(item.updatedAt).format("MMM D")}
          </div>
        </>
      )
    default: 
      return (
        <>
          <h4>Unsure</h4>
        </>
      )
  } 
  return (
    <>
    </>
  )
}

export default JourneyInfo;