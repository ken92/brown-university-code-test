import React from 'react';
import moment from 'moment';

const CURRENT_YEAR = moment().year();

const DetailPanel = props => {
	const { data } = props;
	if (!data)
		return (
			<div className="col-5">
				<p>Nothing here yet!  (Click a user in the list)</p>
			</div>
		);

	const dob = moment(data.dob.date);
	const birthdayDuration = moment.duration(moment().diff(`${dob.format('MM/DD')}/${CURRENT_YEAR}`));
	const birthdayDurationInDays = Math.floor(birthdayDuration.asDays());
	const birthdayDisplay = birthdayDurationInDays === 0 ? "Today!" : birthdayDurationInDays > 0 ? `${birthdayDuration.humanize()} ago` : `In ${birthdayDuration.humanize()}`;

	const name = `${data.name.title ? `${data.name.title} ` : ''}${data.name.first} ${data.name.last}`;
	return (
		<div className="col-5">
			<h3>{name}</h3>
			<div className="container">
				<div className="row">
					<div className="col">Date of Birth: </div>
					<div className="col">
						{dob.format('LL')}
					</div>
				</div>
				<div className="row">
					<div className="col">Age: </div>
					<div className="col">
						{data.dob.age}
					</div>
				</div>
				<div className="row">
					<div className="col">Birthday: </div>
					<div className="col">
						{birthdayDisplay}
					</div>
				</div>
				<div className="row">
					<div className="col">Gender: </div>
					<div className="col">
						{data.gender.charAt(0).toUpperCase() + data.gender.slice(1)}
					</div>
				</div>
				<div className="row">
					<div className="col">Country: </div>
					<div className="col">
						{data.nat === 'US' ? "United States" : "Canada"}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailPanel;
