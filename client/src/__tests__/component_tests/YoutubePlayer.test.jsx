import React from "react";
import { render, getByTestId } from "@testing-library/react";
import { YoutubePlayer } from "../../components/YoutubePlayer";

test("<Youtube/> should displays on render", () => {
  const requiredProps = {
    meditationSession: {
      sessionDetail: { totalTime: 2 }
    },
    getCurrentMeditation: () => {}
  };
  const { getByTestId } = render(<YoutubePlayer {...requiredProps} />);
  expect(getByTestId("test-circular-button")).toBeInTheDocument();
});
