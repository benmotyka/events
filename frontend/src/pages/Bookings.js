import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { PageContainer, Header } from "./Pages.styles";
import AuthContext from "../context/auth-context";
import BookingList from "../components/Bookings/BookingList/BookingList";
function Bookings() {
  const context = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(async () => {
    try {
      loadBookings();
    } catch (error) {}
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const loadedBookings = await fetchBookings();
    setBookings(loadedBookings.data.data.bookings);
    setLoading(false);
  };

  const fetchBookings = async () => {
    const requestBody = {
      query: `
 query{
    bookings{
      _id
      createdAt
      event{
        _id
        title
        date
      }
    }
 }
    `,
    };
    try {
      const token = context.token;

      const response = await axios.post(
        "http://localhost:8080/graphql",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    const requestBody = {
      query: `
 mutation{
    cancelBooking(bookingId: "${bookingId}"){
      _id
      title
    }
 }
    `,
    };
    try {
      const token = context.token;
      const response = await axios.post(
        "http://localhost:8080/graphql",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      loadBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <h1>Your bookings</h1>
      {loading ? (
        <p>Loading</p>
      ) : (
        <BookingList bookings={bookings} onCancel={cancelBooking} />
      )}
    </PageContainer>
  );
}

export default Bookings;
