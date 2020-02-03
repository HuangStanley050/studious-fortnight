import React from 'react';

const DiscoverBadgesList = ({activeBadge, currentlyShowing, badges, setTheBadgeDisplay}) => {
  return (
    <>
      {badges.map((badge) => {
        if (badge.unlocked === true) {
          if (activeBadge.name === badge.name && currentlyShowing === "badges") {
            return (
              <h6 key={badge.id} className="badge-link-active" onClick={setTheBadgeDisplay} value={badge.name}>
                <i class="fas fa-angle-double-right"></i>
                &nbsp;
                {badge.name}
                </h6>
            )
          } else {
            return (
              <h6 key={badge.id} className="badge-link" onClick={setTheBadgeDisplay} value={badge.name}>
                <i className="fas fa-angle-right"></i>
                &nbsp;
                {badge.name}
                </h6>
            )
          }
        }
      })}
    </>
  );
};

export default DiscoverBadgesList;