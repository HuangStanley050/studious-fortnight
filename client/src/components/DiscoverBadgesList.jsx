import React from 'react';

const DiscoverBadgesList = (props) => {
  return (
    <>
      {props.badges.map((badge) => {
        if (badge.unlocked === true) {
          return (
            <h6 key={badge.id} className="badge-link" onClick={props.setTheBadgeDisplay} value={badge.name}>- {badge.name}</h6>
          )
        }
      })}
    </>
  );
};

export default DiscoverBadgesList;