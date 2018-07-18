import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { Component } from 'react'

const QUERY = gql`
  query ItemsQuery {
    reservations {
			id
			name
			hotelId
			arrivalDate
			departureDate
    }
  }
`;

class ReservationsQuery extends Component {
  render() {
    return this.props.children(this.props.data);
  }
}

export default graphql(QUERY, {
  options: { fetchPolicy: 'network-only' }
})(ReservationsQuery);
