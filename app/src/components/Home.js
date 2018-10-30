import React, { Component } from "react";

class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return ( 
<section className="section has-background-white-ter">
    <div className="container">
        <div className="columns is-mobile is-centered">
            <div className="column is-two-fifths ">
                <h1 className="title">Login Table</h1>
                <p className="subtitle is-4">Email: {this.props.match.params.id} </p>
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
                                <tr>
                                    <td>1</td>
                                    <td>2018-10-30 16:01:49</td>
                                </tr>
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