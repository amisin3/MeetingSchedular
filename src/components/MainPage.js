import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import MeetingItem from "./MeetingItem";
import MeetingForm from "./MeetingForm";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { getMeetings } from "../actions/meeting";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import { v4 as uuidv4 } from "uuid";

const MainPage = ({
  meetings: { meetingData, currentDate, loading },
  getMeetings,
}) => {
  useEffect(() => {
    const today = moment().format("ll");
    setCurrentDate(today);
    getMeetingData(today);
  }, [getMeetings]);

  const getMeetingData = (today) => {
    getMeetings(today);
  };

  const [curr_date, setCurrentDate] = useState({
    current_date: "",
  });

  const { current_date } = curr_date;

  const todaysDate = moment().format("ll");

  const prevDate = () => {
    const temp = moment(currentDate).subtract(1, "day");
    setCurrentDate({ ...currentDate, current_date: temp.format("ll") });

    getMeetingData(temp.format("ll"));
  };

  const nextDate = () => {
    const temp = moment(currentDate).add(1, "day");
    setCurrentDate({ ...currentDate, current_date: temp.format("ll") });

    getMeetingData(temp.format("ll"));
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="header_group">
        <button className="btn_prev" onClick={prevDate}>
          &lt;
        </button>
        <h1 className="date_header">📅 {currentDate && currentDate}</h1>
        <button className="btn_next" onClick={nextDate}>
          &gt;
        </button>
      </div>
      {meetingData && meetingData.length > 0 ? (
        meetingData.map((meeting) => (
          <MeetingItem key={uuidv4()} meeting={meeting} />
        ))
      ) : (
        <h1 className="default_text">No Meeting Found</h1>
      )}
      {moment(currentDate).isSameOrAfter(moment(todaysDate)) ? (
        <Link to="/addmeeting">
          {" "}
          <button className="btn_add_meeting">Add Meeting</button>
        </Link>
      ) : (
        <button className="btn_add_meeting" disabled>
          Add Meeting
        </button>
      )}
    </Fragment>
  );
};

MainPage.propTypes = {};

const mapStateToProps = (state) => ({
  meetings: state.meeting,
});

export default connect(mapStateToProps, { getMeetings })(MainPage);
