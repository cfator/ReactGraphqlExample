import React, { PureComponent } from 'react'
import moment from 'moment'

import './DateTimeDisplay.scss'

const dateFmt = "M/DD/YYYY";
const timeFmt = "h:mm a";

export default class DateTimeDisplay extends PureComponent {
	render () {
		return <div className="datetime-display">
			<div className="time">{moment(this.props.datetime).format(timeFmt)}</div>
			<div className="date">{moment(this.props.datetime).format(dateFmt)}</div>
		</div>
	}
}
