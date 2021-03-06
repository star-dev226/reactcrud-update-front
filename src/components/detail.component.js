import React, { Component } from 'react';
import Axios from 'axios';

export default class Detail extends Component {

    constructor(props) {
        super(props);

        this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
        this.onChangePersonName = this.onChangePersonName.bind(this);
        this.onChangeGstNumber = this.onChangeGstNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            person_name: '',
            business_name: '',
            gst_number: '',
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:4000/business/edit/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    person_name: response.data.person_name,
                    business_name: response.data.business_name,
                    gst_number: response.data.gst_number,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangePersonName(e) {
        this.setState({ person_name: e.target.value });
    }

    onChangeBusinessName(e) {
        this.setState({ business_name: e.target.value });
    }

    onChangeGstNumber(e) {
        this.setState({ gst_number: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
            person_name: this.state.person_name,
            business_name: this.state.business_name,
            gst_number: this.state.gst_number,
        };

        Axios.post('http://localhost:4000/business/update/' + this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/index');
    }

    render() {
        return (
            <div style={{ marginTop: 10, width: 400 }}>
                <h3>Video Detail</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title:  </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.person_name}
                            onChange={this.onChangePersonName}
                            disabled />
                    </div>
                    <div className="form-group">
                        <label>Genre: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.business_name}
                            onChange={this.onChangeBusinessName}
                            disabled />
                    </div>
                    <div className="form-group">
                        <label>Descriptions: </label>
                        <textarea
                            className="form-control"
                            value={this.state.gst_number}
                            onChange={this.onChangeGstNumber}
                            disabled />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Go Back" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}