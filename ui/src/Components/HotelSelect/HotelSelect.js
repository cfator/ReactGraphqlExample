import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import React, { PureComponent } from 'react'

const HotelSelect = class HotelSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      options: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.options !== nextProps.data.hotels) {
      this.addEmptyOption(nextProps.data.hotels);
    }
  }

  addEmptyOption(hotels) {
    // add empty option
    let options = [...hotels];
    options.unshift('');
    this.setState({options: options});
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading</div>
    } else if (this.props.error) {
      return <div>{this.props.error}</div>
    }

    return <select name={this.props.name} onChange={this.props.onChange}>
      {this.state.options.map((item, index) => {
        return <option key={index} value={item.name}>{item.name}</option>
      })}
    </select>
  }
};

const HOTELS_QUERY = gql`
  query ItemsQuery {
    hotels {
			id
			name
			lat
			long
    }
  }
`;

export default graphql(HOTELS_QUERY)(HotelSelect);
