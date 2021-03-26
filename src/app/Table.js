import React, { Component } from 'react';
import List from '../app/List'
class Table extends Component {
    constructor() {
        super();
        this.state = {
            divcontainerList: true,
        };
        this.handleChangeButtonList = this.handleChangeButtonList.bind(this);
    }

    handleChangeButtonList = () => {
        this.setState({ divcontainerList: !this.state.divcontainerList });
    }
    render() {
        let dataDiv = [10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 26, 27, 34, 35, 36, 37, 38,
            39, 40, 45, 46, 47, 48, 49, 54, 55, 56, 57,
            58, 59, 60, 61, 66, 67, 74, 75, 76, 77, 78,
            79, 80, 85, 86, 87, 88, 93, 94, 95, 96, 97,
            98, 99, 100, 101, 106, 107, 114, 115, 116,
            117, 118, 119, 120, 125, 133, 134, 135, 136,
            137, 138, 139, 140, 141, 146, 147, 154, 155,
            156, 157, 158, 159, 160, 165, 173, 174, 175,
            176, 177, 178, 179, 180, 181, 186, 187, 193,
            194, 195, 196, 197, 198, 199, 200, 201, 202,
            203, 204, 205, 206, 207, 208, 209, 210, 211,
            212, 213, 214, 215, 216, 217, 218, 219, 220,
            221, 222, 223, 224, 225, 226, 227, 228, 229,
            230, 231, 232, 233, 234, 235, 236, 237, 238,
            239, 240, 241, 242, 243, 244, 245, 246,
            247, 248, 249, 250, 251, 252, 253, 254,
            255, 256, 257, 258, 259, 260, 261, 262,
            263, 264, 265, 266, 267, 268, 269,
            270, 271, 272, 273, 274, 275, 276, 277,
            278, 279, 280];

        let minuteInterval = 20;
        let times = [];
        let startTime = 0;
        let ap = ['AM', 'PM'];
        let timeSlice;
        for (let i = 0; startTime < 24 * 60; i++) {
            let hh = Math.floor(startTime / 60);
            let mm = (startTime % 60);
            times[i] = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + ap[Math.floor(hh / 12)];
            startTime = startTime + minuteInterval;
        }
        timeSlice = times.slice(24, 64);
        let data = {
            "monday": [
                { "name": "Jorge", "start_time": "08:00", "end_time": "09:00" },
                { "name": "Jorge", "start_time": "09:30", "end_time": "11:00" },
                { "name": "Jorge", "start_time": "15:00", "end_time": "16:00" },
                { "name": "Jorge", "start_time": "17:00", "end_time": "19:30" }
            ],
            "tuesday": [
                { "name": "Jorge", "start_time": "08:00", "end_time": "09:00" },
                { "name": "Jorge", "start_time": "11:30", "end_time": "12:00" },
                { "name": "Jorge", "start_time": "15:00", "end_time": "16:00" },
                { "name": "Jorge", "start_time": "17:00", "end_time": "19:30" }
            ],
            "wednesday": [
                { "name": "Jorge", "start_time": "08:00", "end_time": "09:00" },
                { "name": "Jorge", "start_time": "10:30", "end_time": "12:00" },
                { "name": "Jorge", "start_time": "15:00", "end_time": "16:00" },
                { "name": "Jorge", "start_time": "17:00", "end_time": "19:30" }
            ],
            "thursday": [
                { "name": "Jorge", "start_time": "08:00", "end_time": "09:00" },
                { "name": "Jorge", "start_time": "09:30", "end_time": "12:00" },
                { "name": "Jorge", "start_time": "15:00", "end_time": "16:00" },
                { "name": "Jorge", "start_time": "17:00", "end_time": "19:30" }
            ],
            "friday": [
                { "name": "Jorge", "start_time": "08:00", "end_time": "09:00" },
                { "name": "Jorge", "start_time": "09:30", "end_time": "12:00" },
                { "name": "Jorge", "start_time": "15:00", "end_time": "16:00" },
                { "name": "Jorge", "start_time": "17:00", "end_time": "19:30" }
            ]
        }
        const dataTime = Object.entries(data).map(([val, index]) => {
            let keyWeek = val;
            return keyWeek;
        })


        return (
            <div>
                <div className="container_task--button">
                    <button className="btn--schudule deco-style" onClick={this.handleChangeButtonList}>
                        {this.state.divcontainerList ? "ver notas" : "agendar alumnos"}
                    </button>
                </div>
                {this.state.divcontainerList ?
                    <div className="week">
                        <div className="horastart week__week-header">
                            <i className="fas fa-angle-double-left"></i>
                        </div>
                        <div className="lunes week__week-header">Lunes</div>
                        <div className="martes week__week-header">Martes</div>
                        <div className="miercoles week__week-header">Miercoles</div>
                        <div className="jueves week__week-header">Jueves</div>
                        <div className="viernes week__week-header">Vienes</div>
                        <div className="sabado week__week-header">Sabado</div>
                        <div className="domingo week__week-header">Domingo</div>
                        <div className="horaend week__week-header">
                            <i className="fas fa-angle-double-right"></i>
                        </div>

                        {dataDiv.map(function (e, index) {
                            // console.log(e)
                            return <div key={index} className={`div${e} time-avalible`}><i className="fas fa-plus-circle"></i></div>
                        })}
                        {timeSlice.map(function (hours, index) {
                            return <div key={index} className={`div-start${index + 1} week_day test`}>{hours}</div>
                        })}
                        {
                            dataTime.map(function (e) {
                                return data[e].map(function (element, index) {
                                    return (
                                        <div key={index} className={`${e}${element.name}${index} week_day--student`}>
                                            <i className="far fa-calendar-alt"></i>
                                            <p className="week__week--name">{element.name}</p>
                                            <i className="far fa-comment"></i>
                                        </div>
                                    )
                                })
                            })

                        }
                        {timeSlice.map(function (hours, index) {
                            return <div key={index} className={`div-end${index + 1} week_day`}>{hours}</div>
                        })}
                    </div>
                    : null}
                {!this.state.divcontainerList ? <List /> : null}
            </div>
        )
    }
}

export default Table;