import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { Component } from 'react'

const MUTATION = gql`
  mutation ItemCreate($name: String!, $hotelId: ID!, $arrivalDate: String!, $departureDate: String!) {
    createReservation(name: $name, hotelId: $hotelId, arrivalDate: $arrivalDate, departureDate: $departureDate)
  }
`;

class ReservationMutation extends Component {
  constructor(props, ctx) {
    super(props, ctx);

    this.execute = this.executeMutation;
  }

  executeMutation(name, hotelId, arrivalDate, departureDate) {
    this.props.mutate({
      variables: {
        __typename: 'Reservation',
        name: name,
        hotelId: hotelId,
        arrivalDate: arrivalDate,
        departureDate: departureDate
      }
    });
  }

  render() {
    return this.props.children(this.execute);
  }
}

export default graphql(MUTATION)(ReservationMutation);
