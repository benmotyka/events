import React, { useState, useContext, useEffect } from "react";
import Modal from "../components/Modal/Modal";
import Backdrop from "../components/Modal/Backdrop/Backdrop";
import axios from "axios";

import { PageContainer, EventsContainer, EventsList } from "./Pages.styles";
import Button from "../components/Button/Button";
import AuthContext from "../context/auth-context";

import EventItem from "../components/Events/EventsList/EventsItem/EventsItem";
function Events() {
  const context = useContext(AuthContext);

  const [modalShown, setModalShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
    setLoading(true);
    const loadedEvents = await fetchEvents();
    setEvents(loadedEvents.data.data.events);
    setLoading(false);
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
      creator{
        _id
        email
      }
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
    setSelectedEvent(null);
  };

  const showDetails = (eventId) => {
    const selectedEvent = events.find((e) => e._id === eventId);
    setSelectedEvent(selectedEvent);
    console.log(selectedEvent);
  };

  const bookEvent = () => {};

  return (
    <PageContainer>
      {(modalShown || selectedEvent) && <Backdrop />}
      {modalShown && (
        <Modal
          title="Create event"
          cancel
          confirm
          onCancel={cancelModal}
          onConfirm={confirmModal}
          onConfirmText="Confirm"
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
      {selectedEvent && (
        <Modal
          title={selectedEvent.title}
          cancel
          confirm
          onCancel={cancelModal}
          onConfirm={confirmModal}
          onConfirmText="Book"
        >
          <h4>${selectedEvent.price}</h4>
          <h4>{new Date(selectedEvent.date).toLocaleDateString()}</h4>
          <h4>{selectedEvent.description}</h4>
          <h4>Created by: {selectedEvent.creator.email}</h4>
        </Modal>
      )}
      <div>
        <h1>Events</h1>
        {context.token && <Button onClick={showModal} text="Create event" />}
      </div>
      {loading ? (
        <p>Loading</p>
      ) : (
        <EventsContainer>
          <EventsList>
            {events.map((event) => {
              return (
                <EventItem
                  eventId={event._id}
                  title={event.title}
                  date={event.date}
                  price={event.price}
                  creator={event.creator.email}
                  userId={context.userId}
                  creatorId={event.creator._id}
                  onDetails={() => {
                    showDetails(event._id);
                  }}
                />
              );
            })}
          </EventsList>
        </EventsContainer>
      )}
    </PageContainer>
  );
}

export default Events;
