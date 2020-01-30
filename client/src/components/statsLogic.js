import moment from 'moment';

export const currentRunStreakCalc = (response, setRunStreak) => {
  let longestRunStreakArray = [];
  let oneRunStreak = 0;
  const currentTime = moment().unix()

  for(let i = 0; i < response.data.length; i++) {
    if (response.data[i+1] !== undefined) { 
      // oneRunStreak = 1;
      const prevUpdated = Date.parse(response.data[i].updatedAt)
      const currentUpdated = Date.parse(response.data[i+1].updatedAt)

      if (prevUpdated !== Date.parse(response.data[i].createdAt)) {
        if(currentTime - prevUpdated < 86400) { //defines current run streak: within the day
            if(currentUpdated - prevUpdated < 86400 && response.data[i].completed === true) {
              //for every session completed in a 24hr window, add 1 to the runStreak. 
              oneRunStreak++;
            } else {
              //else break the run streak, push it to array, and start again at 1.
              longestRunStreakArray.push(oneRunStreak);
              oneRunStreak = 0;
            }
        }  
      }

    } else {
      if(response.data[i].completed === true ) {
        oneRunStreak++;
      }
      longestRunStreakArray.push(oneRunStreak);
      oneRunStreak = 0;
    }

  }

  const highestRunStreak = Math.max.apply(null, longestRunStreakArray);
  setRunStreak(highestRunStreak);
}

//check if working
export const longestRunStreakCalc = (response, setLongestRunStreak) => {
  let longestRunStreakArray = [];
  let oneRunStreak = 0;

  for(let i = 0; i < response.data.length; i++) {
    if(response.data[i+1] !== undefined ) {
      const prevUpdated = Date.parse(response.data[i].updatedAt)
      const currentUpdated = Date.parse(response.data[i+1].updatedAt)

      if (prevUpdated !== Date.parse(response.data[i].createdAt)) {
        if(currentUpdated - prevUpdated < 86400) {
          //seconds 24hrs = 24 * 60 minues * 60 seconds = 86,400 seconds
          //for every session completed in a 24hr window, add 1 to the runStreak. 
          oneRunStreak++;
        } else {
          //else break the run streak, push it to array, and start again at 1.
          longestRunStreakArray.push(oneRunStreak);
          oneRunStreak = 1;
        }
      }

    } else {
      if(response.data[i].completed === true ) {
        oneRunStreak++;
      }
      longestRunStreakArray.push(oneRunStreak);
      oneRunStreak = 0;
    }
  }
  const highestRunStreak = Math.max.apply(null, longestRunStreakArray);
  setLongestRunStreak(highestRunStreak);
}