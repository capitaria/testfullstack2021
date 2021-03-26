import React, { Component } from 'react';
import Nav from '../app/Nav'
import Courses from '../app/Courses'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            divcontainer: true
        }
    }

    render() {
        return (
            <div>
                <Nav />
                <Courses  />
            </div>
        )
    }
}

export default App;