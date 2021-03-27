import React, { Component } from 'react';
import Table from '../app/Table'
class Courses extends Component {
    constructor() {
        super();
        this.state = {
            _id: '',
            student: '',
            course: '',
            experience: '',
            grade: '',
            div_containerForm: true,
            tasks: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.handleChangeButtonTable = this.handleChangeButtonTable.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleChangeButtonTable = () => {
        this.setState({ div_containerForm: !this.state.div_containerForm });
    }

    addTask = (e) => {
        let messageError = document.querySelector(".container_task--message p");
        e.target.value == undefined ? messageError.innerHTML = "Por favor, introducir campos o verificar campo notas (solo recibe números)." : "";
        e.preventDefault();
        if (this.state._id) {
            this.addTaskPut(this.state._id);
        } else {
            this.addTaskPost(this.state);
        }
    }

    addTaskPut = (data) => {
        fetch(`/api/tasks/${data}`, {
            method: 'PUT',
            body: JSON.stringify({
                student: this.state.student,
                course: this.state.course,
                experience: this.state.experience,
                grade: this.state.grade
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ _id: '', student: '', course: '', experience: '', grade: '' });
                this.fetchTasks();
            });
        let messageError = document.querySelector(".container_task--message p");
        data ? messageError.innerHTML = "" : "";
    }

    addTaskPost = (data) => {
        fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                let messageError = document.querySelector(".container_task--message p");
                data ? messageError.innerHTML = "" : "";
                this.setState({
                    student: '',
                    course: '',
                    experience: '',
                    grade: ''
                });
                this.fetchTasks();
            })
            .catch(err => console.error(err));
    }
    deleteTask = (id) => {
        if (confirm('Estas seguro de eliminar esto?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.fetchTasks();
                });
        }
    }

    editTask = (id) => {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    student: data.student,
                    course: data.course,
                    experience: data.experience,
                    grade: data.grade,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = () => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });
            })
            .catch(err => console.error(err));
    }
    render() {
        return (
            <div className="container_main">
                { this.state.div_containerForm ?
                    <div className="container_task">
                        <div className="container_task--form">
                        <h4>Formulario de notas</h4>
                            <form onSubmit={this.addTask} >
                                <div className="container_task--student">
                                    <input name="student" autoComplete="off" onChange={this.handleChange} value={this.state.student} type="text" placeholder="Alumno " />
                                </div>
                                <div className="container_task--course">
                                    <input name="course" autoComplete="off" onChange={this.handleChange} value={this.state.course} type="text" placeholder="Curso " />
                                </div>

                                <div className="container_task--experience">
                                    <input name="experience" autoComplete="off" onChange={this.handleChange} value={this.state.experience} type="text" placeholder="Prueba" />
                                </div>
                                <div className="container_task--grade">
                                    <input name="grade" autoComplete="off" onChange={this.handleChange} value={this.state.grade} type="text" placeholder="Nota" />
                                </div>
                                <div className="container_task--message">
                                    <p></p>
                                </div>
                                <button type="submit" className="container_task--btn deco-style">
                                    enviar
                                </button>
                            </form>
                        </div>
                        <div className="container_task--list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Alumno</th>
                                        <th>Curso</th>
                                        <th>Prueba</th>
                                        <th>Nota</th>
                                        <th>Editar</th> 
                                        <th>Eliminar</th>                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.student}</td>
                                                    <td>{task.course}</td>
                                                    <td>{task.experience}</td>
                                                    <td>{task.grade}</td>
                                                    <td>
                                                        <button onClick={() => this.deleteTask(task._id)} className="button_icon--trash deco-style mr">
                                                            <i className="far fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <button onClick={() => this.editTask(task._id)} className="button_icon--edit deco-style mr">
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : null}
                <div className="container_task--button">
                    <button className="button--schedule deco-style" onClick={this.handleChangeButtonTable}>
                        {this.state.div_containerForm ? "Agendar alumnos" : "Inicio"}
                    </button>
                </div>
                {!this.state.div_containerForm ? <Table /> : null}
            </div>

        )
    }
}

export default Courses;