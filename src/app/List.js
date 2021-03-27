import React, { Component } from 'react';
class List extends Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      studentlist: '',
      courselist:'',
      gradelist: '',
      div_containerButton: true,
      lists: []

    };
    this.handleChangeButtonSort = this.handleChangeButtonSort.bind(this);
  }
  handleChangeButtonSort = () => {
    let sortGrade;
    if (this.state.div_containerButton) {
      sortGrade = this.state.lists.sort(function (a, b) {
        return a.gradelist - b.gradelist
      })
    } else {
      sortGrade = this.state.lists.sort(function (a, b) {
        return b.gradelist - a.gradelist
      })
    }

    this.setState({
      lists: sortGrade,
      div_containerButton: !this.state.div_containerButton
    });
  }
  componentDidMount() {
    this.fetchLists();
  }

  fetchLists = () => {
    fetch('/api/list')
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
                  console.log(list)
                  return (
                    <tr key={list._id}>
                      <td>{list.studentlist}</td>
                      <td>{list.courselist}</td>
                      <td>{list.gradelist}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div>
          <button onClick={this.handleChangeButtonSort}>
            {this.state.div_containerButton ? "Menor nota" : "Mayor nota"}
          </button>
        </div>
      </div>
    )
  }
}


export default List;