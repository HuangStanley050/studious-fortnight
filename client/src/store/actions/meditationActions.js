import API from "../../api";
import axios from "axios";
import Action from "./index";

export const updateMeditation = condition => ({
  type: Action.UPDATE_MEDITATION,
  condition
});

export const getCurrentMeditationOkay = data => ({
  type: Action.GET_CURRENT_MEDITATION,
  data
});

export const getCurrentMeditationError = () => ({
  type: Action.GET_CURRENT_MEDITATION_ERROR
});

export const getCurrentMeditation = () => {
  return async dispatch => {
    try {
      const token = localStorage.getItem("CMCFlow");
      console.log(" I am in getcurrent meditatin async action creator");
      let result = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "get",
        url: API.userMeditation
      });
      //console.log(result.data);
      dispatch(getCurrentMeditationOkay(result.data));
    } catch (err) {
      console.log(err.response.data.msg);
      //dispatch(getCurrentMeditationError());
    }
  };
};
