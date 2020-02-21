import React from 'react';
import ColoredInput from './ColoredInput';
const { useState } = React;

const ListPanel = props => {
	const { data, onSelect } = props;
	const [searchValue, setSearchValue] = useState('');
	const [sortColumn, setSortColumn] = useState('First Name');
	const [sortOrder, setSortOrder] = useState('desc');

	if (!data)
		return null;

	const getValFromSortKey = (data, key) => {
		switch (key) {
			case 'First Name':
				return data.name.first;
			case 'Last Name':
				return data.name.last;
			case 'Gender':
				return data.gender;
			case 'Title':
				return data.name.title;
			default:
				return '';
		}
	};
	const sortFunc = (a, b) => {
		const aVal = getValFromSortKey(a, sortColumn);
		const bVal = getValFromSortKey(b, sortColumn);
		if (aVal === bVal)
			return 0;
		if (sortOrder === 'asc')
			return aVal > bVal ? -1 : 1;
		else
			return aVal > bVal ? 1 : -1;
	};

	data.sort(sortFunc);

	let filteredData = data;
	if (searchValue) {
		const regex = new RegExp(`.*${searchValue}.*`, 'gi');
		filteredData = data.filter(d => Boolean(`${d.name.title} ${d.name.first} ${d.name.last}`.match(regex)));
	}

	const list = filteredData ? filteredData.map((d, index) => {
		return (
			<tr key={index} onClick={onSelect.bind(this, index)} className="listRow">
				<td>{d.name.title || '(None)'}</td>
				<td>{d.name.first}</td>
				<td>{d.name.last}</td>
				<td>{d.gender.charAt(0).toUpperCase() + d.gender.slice(1)}</td>
			</tr>
		);
	}) : null;

	const sortArrow = sortOrder === 'asc' ? '⇑' : '⇓';
	const normalArrow = '🡓';

	const updateSortColumn = name => {
		if (sortColumn === name) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(name);
			setSortOrder('desc');
		}
	};
	const makeHeaderCell = name => {
		return (
			<th scope="col" style={{cursor: 'pointer'}} onClick={updateSortColumn.bind(this, name)}>
				{sortColumn === name ? sortArrow : normalArrow}{name}
			</th>
		);
	};

	return (
		<div className="col-7">
			<div className="container">
				<ColoredInput value={searchValue} onChange={setSearchValue} placeholder="Search" />

				<table className="table">
					<thead>
						<tr>
							{makeHeaderCell('Title')}
							{makeHeaderCell('First Name')}
							{makeHeaderCell('Last Name')}
							{makeHeaderCell('Gender')}
						</tr>
					</thead>
					<tbody>
						{list}
					</tbody>
				</table>

			</div>
		</div>
	);
};

export default ListPanel;
