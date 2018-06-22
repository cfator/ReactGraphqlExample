import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react'

@inject('store')
@observer

export default class HotelSelect extends Component {
  constructor(props) {
    super(props);

    // add empty option as default
    let options = [...this.props.store.hotels];
    options.unshift('');

    this.state = {
      options: options
    };
  }

  render() {
    return <select name={this.props.name} onChange={(e) => {
        this.props.onChange(this.state.options[e.target.selectedIndex]);
      }}>
      {this.state.options.map((item, index) => {
        return <option key={index} value={item.id}>{item.name}</option>
      })}
    </select>
  }
};
