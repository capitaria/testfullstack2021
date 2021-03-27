import React, { Component } from 'react';
class List extends Component {
	constructor() {
		super();
		this.state = {
			_id: '',
			student: '',
			course: '',
			grade: '',
			div_containerButton: true,
			lists: [],
			showlist: []

		};
		this.handleChangeButtonSort = this.handleChangeButtonSort.bind(this);
		this.sortGradeList = this.sortGradeList.bind(this);
		this.showGradeList = this.showGradeList.bind(this);
	}

	handleChangeButtonSort = () => {
		let sortList = this.sortGradeList();
		this.setState({
			lists: sortList,
			div_containerButton: !this.state.div_containerButton
		});

		this.showGradeList(sortList);
	}

	sortGradeList = () => {
		let sortGrade;
		if (this.state.div_containerButton) {
			sortGrade = this.state.lists.sort(function (a, b) {
				return a.grade - b.grade
			})
		} else {
			sortGrade = this.state.lists.sort(function (a, b) {
				return b.grade - a.grade
			})
		}
		return sortGrade;
	}

	showGradeList = (sortLists) => {
		let showlist;
		if (this.state.div_containerButton) {
			showlist = sortLists.reduce(
				(a, b) =>
					a.grade < b.grade
						? a
						: b
			)
		} else {
			showlist = sortLists.reduce(
				(a, b) =>
					a.grade> b.grade
						? a
						: b
			)
		}
		this.setState({
			showlist
		});
	}

	componentDidMount() {
		this.fetchLists();
	}

	fetchLists = () => {
		fetch('/api/tasks')
			.then(res => res.json())
			.then(data => {
				this.setState({
					lists: data
				});

			})
			.catch(err => console.error(err));
	}
	render() {
		return (
			<div className="container_list">
				<div className="container_list--table">
					<table>
						<thead>
							<tr>
								<th>Alumnos</th>
								<th>Cursos</th>
								<th>Notas</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.lists.map(list => {
									return (
										<tr key={list._id}>
											<td>{list.student}</td>
											<td>{list.course}</td>
											<td>{list.grade}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				<div className="container_button--gradelist">
					<button className="button--gradelist deco-style" onClick={this.handleChangeButtonSort}>
						{this.state.div_containerButton ? "Menor nota" : "Mayor nota"}
					</button>
				</div>
				{
					this.state.showlist.length == undefined ?
						<div className="">
							<h3>Resultados</h3>
							<p>Estudiante: {this.state.showlist.student}</p>
							<p>Curso: {this.state.showlist.course}</p>
							<p>Nota: {this.state.showlist.grade}</p>
						</div>
						: null}
			</div>
		)
	}
}

export default List;