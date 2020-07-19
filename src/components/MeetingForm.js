import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";
import { addMeetings } from "../actions/meeting";
import { setAlert } from "../actions/alert";

const MeetingForm = ({
  meetings: { currentDate, meetingData },
  addMeetings,
  setAlert,
}) => {
  const [formData, setFormData] = useState({
    current_date: "",
    start_time: "",
    end_time: "",
    description: "",
  });

  const { start_time, end_time, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(start_time);

    if (start_time === "" || end_time === "" || description === "") {
      setAlert("Fill All Details", "danger");
      return;
    }

    let available = true;
    meetingData.map((meeting) => {
      if (
        moment(start_time, "HH:mm").isBetween(
          moment(meeting.start_time, "HH:mm"),
          moment(meeting.end_time, "HH:mm")
        ) ||
        moment(end_time, "HH:mm").isBetween(
          moment(meeting.start_time, "HH:mm"),
          moment(meeting.end_time, "HH:mm")
        )
      ) {
        available = false;
        setAlert("Slot Not Available", "danger");
        return;
      }
    });
    if (available) {
      // alert("Slot is available");
      setAlert("Slot Available", "success");
      let state = {
        date: currentDate,
        start_time,
        end_time,
        description,
      };

      addMeetings(JSON.stringify(state));
    }
  };

  return (
    <Fragment>
      <div className="meeting_form_box">
        <Link to="/">
          <button className="btn_back">⬅️ Back</button>
        </Link>
        <form className="meeting_form" onSubmit={(e) => onSubmit(e)}>
          <div className="form_group">
            <label htmlfor="form_date">DATE</label>
            <input
              type="text"
              id="form_date"
              className="form_date"
              value={currentDate}
              onChange={(e) => onChange(e)}
              readOnly
            />
          </div>
          <div className="form_group">
            <label htmlfor="form_start_time">START_TIME</label>
            <input
              type="time"
              id="form_start_time"
              className="form_start_time"
              name="start_time"
              value={start_time}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form_group">
            <label htmlfor="form_end_time">END_TIME</label>
            <input
              type="time"
              id="form_end_time"
              className="form_end_time"
              name="end_time"
              value={end_time}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form_group">
            <label htmlfor="form_description">Description</label>
            <textarea
              id="form_description"
              name="description"
              className="form_description"
              rows="3"
              value={description}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button className="btn_save">Save</button>
        </form>
      </div>
    </Fragment>
  );
};

MeetingForm.propTypes = {};

const mapStateToProps = (state) => ({
  meetings: state.meeting,
});

export default connect(mapStateToProps, { addMeetings, setAlert })(MeetingForm);
