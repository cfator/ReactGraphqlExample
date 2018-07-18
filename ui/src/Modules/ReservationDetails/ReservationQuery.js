import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { Component } from 'react'

const QUERY = gql`
  query ItemQuery($id: ID!) {
    reservation(id: $id) {
			id
			name
			hotelId
			arrivalDate
			departureDate
    }
  }
`;

class ReservationQuery extends Component {
  render() {
    return this.props.children(this.props.data);
  }
}

export default graphql(QUERY, {
  options: { fetchPolicy: 'network-only' }
})(ReservationQuery);
