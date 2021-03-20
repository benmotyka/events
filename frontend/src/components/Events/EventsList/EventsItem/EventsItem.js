import React from "react";
import {
  ItemContainer,
  ItemSection,
  ItemPrice,
  ItemTitle,
} from "./EventsItems.styles";

import Button from "../../../Button/Button";
function EventsItem(props) {
  return (
    <ItemContainer key={props.eventId}>
      <ItemSection left={true}>
        <ItemTitle>{props.title}</ItemTitle>
        <ItemPrice>
          ${props.price} - {new Date(props.date).toLocaleDateString()}
        </ItemPrice>
      </ItemSection>
      <ItemSection>
        {props.userId === props.creatorId ? (
          <ItemTitle>You're the owner of this event</ItemTitle>
        ) : (
          <Button onClick={props.onDetails} text="View details" />
        )}
      </ItemSection>
    </ItemContainer>
  );
}

export default EventsItem;
