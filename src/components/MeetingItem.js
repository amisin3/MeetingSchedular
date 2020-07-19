import React from "react";
import PropTypes from "prop-types";

const MeetingItem = ({ meeting: { start_time, end_time, description } }) => {
  return (
    <div className="meeting_box">
      <div className="meeting_time">
        <p>
          {start_time}-{end_time}
        </p>
      </div>
      <div className="meeting_description">
        <p>{description}</p>
      </div>
    </div>
  );
};

MeetingItem.propTypes = {};

export default MeetingItem;
