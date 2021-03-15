import React, { useState, useContext, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Modal/Backdrop/Backdrop";
import axios from "axios";

import {
  PageContainer,
  EventsContainer,
  EventItem,
  EventsList,
} from "./Pages.styles";
import Button from "../components/Button/Button";
import AuthContext from "../context/auth-context";

function Events() {
  const context = useContext(AuthContext);

  const [modalShown, setModalShown] = useState(false);

  const [values, setValues] = useState({
    title: "",
    price: 0,
    date: "",
    description: "",
  });

  const [events, setEvents] = useState([]);

  useEffect(async () => {
    try {
      loadEvents();
    } catch (error) {}
  }, []);

  const loadEvents = async () => {
    const loadedEvents = await fetchEvents();
    setEvents(loadedEvents.data.data.events);
  };
  const set = (field) => {
    return ({ target: { value } }) => {
      setValues((oldValues) => ({ ...oldValues, [field]: value }));
    };
  };

  const showModal = () => {
    setModalShown(!modalShown);
  };

  const confirmModal = async () => {
    const newEvent = values;
    newEvent.price = parseFloat(newEvent.price);
    const requestBody = {
      query: `
      mutation {
        createEvent(eventInput: {title: "${newEvent.title}", description: "${newEvent.description}", price: ${newEvent.price}, date: "${newEvent.date}"})
        {
          _id
          title
          description
          date
          price
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
    } catch (error) {
      console.log(error);
    }
    loadEvents();
    setModalShown(false);
    setValues({ title: "", price: 0, date: "", description: "" });
  };

  const fetchEvents = async () => {
    const requestBody = {
      query: `
 query{
    events {
      _id
      title
      description
      date
      price
    }
 }
    `,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/graphql",
        requestBody
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const cancelModal = () => {
    setModalShown(false);
  };
  return (
    <PageContainer>
      {modalShown && <Backdrop />}
      {modalShown && (
        <Modal
          title="Modal Content"
          cancel
          confirm
          onCancel={cancelModal}
          onConfirm={confirmModal}
        >
          <form>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={values.title}
                onChange={set("title")}
              />
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                value={values.price}
                onChange={set("price")}
              />
            </div>{" "}
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                value={values.date}
                onChange={set("date")}
              />
            </div>{" "}
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={values.description}
                onChange={set("description")}
              />
            </div>
          </form>
        </Modal>
      )}
      <div>
        <h1>Events</h1>
        {context.token && <Button onClick={showModal} text="Create event" />}
      </div>
      <EventsContainer>
        <EventsList>
          {events.map((event) => {
            return <EventItem key={event._id}>{event.title}</EventItem>;
          })}
        </EventsList>
      </EventsContainer>
    </PageContainer>
  );
}

export default Events;
