import React, { Component } from "react";
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            id: this.props.match.params.id,
            email: '',
            times: []
        })
        this.getUser();
    }

    timesTable = () => {
        return this.state.times.map((time, index) => {
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{time}</td>
                </tr>
            )
        })
    }

    getUser() {
        axios.get(`https://server-buu-59160548.herokuapp.com/user/${this.props.match.params.id}`)
            .then(res => {
                console.log(res);
                this.setState({
                    email: res.data.user.email,
                    times: res.data.user.Timestamp
                })
            })
            .catch(err => {
                console.log(err);
                
            })
    }

    render() {
        return ( 
<section className="section has-background-white-ter">
    <div className="container">
        <div className="columns is-mobile is-centered">
            <div className="column is-two-fifths ">
                <h1 className="title">Login Table</h1>
                <p className="subtitle is-4">Email: {this.state.email} </p>
                <div className="box">
                    <div className="media-content">
                        <table className="table is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th><abbr title="No">No</abbr></th>
                                    <th><abbr title="Timestamp">Timestamp</abbr></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.timesTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
        );
    }
}

export default Home;