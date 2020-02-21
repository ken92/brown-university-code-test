import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import ListPanel from './ListPanel';
import DetailPanel from './DetailPanel';
import './css/index.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedUserIndex: null,
			users: null
		};
	}

	componentDidMount() {
		axios.get(`https://randomuser.me/api/?results=20&nat=us,ca`)
			.then(users => {
				this.setState({ users: users.data.results });
			});
	}

	handleUserClicked = selectedUserIndex => {
		this.setState({ selectedUserIndex: selectedUserIndex === this.state.selectedUserIndex ? null : selectedUserIndex });
	}

	render() {
		const { selectedUserIndex, users } = this.state;
		const detailPanelData = users && selectedUserIndex !== null && users[selectedUserIndex] ? users[selectedUserIndex] : null;
		return (
			<div className="container" style={{marginTop: '1em'}}>
				<div className="row">
					<ListPanel
						data={users}
						onSelect={this.handleUserClicked}
					/>
					<DetailPanel
						data={detailPanelData}
					/>
				</div>
			</div>
		);
	}
};

ReactDOM.render(
	<App />,
	document.getElementById("root")
);
