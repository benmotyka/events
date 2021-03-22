import React from "react";
import Button from "../../Button/Button";
function BookingList(props) {
  return (
    <ul>
      {props.bookings.map((booking) => {
        return (
          <li key={booking._id}>
            <div>
              {booking.event.title} -
              {new Date(booking.createdAt).toLocaleDateString()}
            </div>
            <div>
              <Button
                text="Cancel event"
                onClick={() => {
                  props.onCancel(booking._id);
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default BookingList;
