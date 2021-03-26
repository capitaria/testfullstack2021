import React, { Component } from 'react';
class List extends Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      studentlist: '',
      gradelist: '',
      lists: []

    };
    this.handleChangeButtonSort = this.handleChangeButtonSort.bind(this);
  }
  componentDidMount() {
    this.fetchLists();
  }

  handleChangeButtonSort = () => {
    const sortGrade = this.state.lists.sort(function (a, b) {
      return a.gradelist - b.gradelist 
    })
     this.setState({ lists: sortGrade });
  }

  fetchLists = () => {
    fetch('/api/list')
      .then(res => res.json())
      .then(data => {
        this.setState({ lists: data });
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
                      <td>{list.studentlist}</td>
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
            Filtrar
              </button>
        </div>
      </div>
    )
  }
}


export default List;