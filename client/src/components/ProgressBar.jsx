import React from "react";

class ProgressBar extends React.Component {
  //this ensures that the progress bar does not extend past -0 or 100+
  clamp = (min, value, max) => {
    return Math.min(Math.max(min, value), max);
  };

  render() {
    return (
      <div className="track">
        <div
          id="thumb"
          style={{ width: `${this.clamp(0.1, this.props.percentage, 100)}%` }}
        ></div>
      </div>
    );
  }
}

export default ProgressBar;
