import React, {useState} from 'react';
import moment from 'moment';
import JourneyInfo from './JourneyInfo.jsx';
import './Journey.scss';

const Journey = ({totalTimeMeditated, journeyItems}) => {
  //render timeline thing:
  // ==> first show total time meditated
  // ==> then show each meditation completed, and the date it was completed, with a clickable box that comes up 
  const [showPopup, setShowPopup] = useState(false);
  const [currentPopupInfo, setCurrentPopupInfo] = useState({});

  const popupDisplay = (e) => {
    setShowPopup(true);
    const journeyItemId = e.currentTarget.getAttribute("value");
    const journeyItem = journeyItems.filter((item) => item._id === journeyItemId);

    const theJourneyItem = journeyItem[0];

    let courseName = "Beginner";
    let totalLevels = 3;
    if(theJourneyItem.sessionDetail.totalTime === 180) {
      courseName = "Beginner";
      totalLevels = 3;
    } else if (theJourneyItem.sessionDetail.totalTime === 300) {
      courseName = "Intermediate";
      totalLevels = 4;
    } else if (theJourneyItem.sessionDetail.totalTime === 600) {
      courseName = "Expert";
      totalLevels = 5;
    }

    setCurrentPopupInfo({
      courseName: courseName,
      totalLevels: totalLevels,
      level: theJourneyItem.sessionDetail.level,
      quote: theJourneyItem.sessionDetail.quote,
      totalTime: theJourneyItem.sessionDetail.totalTime,
      updatedAt: theJourneyItem.updatedAt
    })
  }

  const closePopup = () => {
    setShowPopup(false);
    setCurrentPopupInfo({});
  }

  return (
    <>
    {showPopup ? 
      <div className="popup">
        <div className="left-side">
          <h4 onClick={closePopup} className="close-button">X</h4>
          <p>{moment().format("MMM D")}</p>
          <h1>{currentPopupInfo.courseName}</h1>
          <h4>Level {currentPopupInfo.level} of {currentPopupInfo.totalLevels}</h4>
        </div>
        <div className="right-side">
          <div>{currentPopupInfo.quote}</div>
        </div>
      </div>
    :
      <>
          <div className="timeline-div">
            <div className="timeline-graphic">
              <div className="circle"></div>
              <div className="line"></div>
            </div>
            <div className="total-time">
              <h1><i className="far fa-clock size"></i></h1>
              <div className="info">
                <h4>{totalTimeMeditated} minutes meditated</h4>
                <p>{moment().format("MMMM Do")}</p>
              </div>
            </div>
          </div>

        {journeyItems.map((item) => {
          return (
            <div className="timeline-div" key={item._id}>
              <div className="timeline-graphic">
                <div className="circle-item"></div>
                <div className="line"></div>
              </div>
              <div className="journey-item" 
                    value={item._id}
                    onClick={popupDisplay}
                    data-testid="journey-item"
              >
                <JourneyInfo item={item} />
              </div>
            </div>
          )
        })}

      </>
    }
    </>
  )
}

export default Journey;