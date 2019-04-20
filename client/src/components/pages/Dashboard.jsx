import React, { Component } from 'react'
import axios from 'axios'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';

import { Consumer, Context } from '../store/context'

const columns = [
    {
        dataField: 'url',
        text: 'URLs'
    },

    {
        dataField: 'hits',
        text: 'Hits'
    },
    {
        dataField: 'shortUrl',
        text: 'Short URL'
    },
    {
        dataField: 'createdDate',
        text: 'Date'
    },
];

export default class Dashboard extends Component {
    static contextType = Context
    state = {
        data: []
    }

    componentDidMount() {
        const url = 'api/users/dashboard'

        const context = this.context

        const userToken = context.user.token;

        
        if (userToken.length > 0) {
            axios.get(url, {
                headers: {
                    Authorization: userToken
                }
            }).then( (res) => {
                let urls = res.data.urls.map(url => ({ ...url, shortUrl: axios.defaults.baseURL + "/" + url.urlCode }));
                
                this.setState({ data: urls  })
    
            })
        }


    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { user } = value
                    return (
                        user.token.length === 0 ? <h3 className="center-align">Please Login To View Dashboard...</h3> : (
                            < BootstrapTable keyField='url'
                                data={this.state.data}
                                columns={columns}
                                bordered={true}
                                hover={true}
                            />
                        )
                    )

                }}
            </Consumer>
        )
    }
}

function isEmpty(obj) {
    if (obj == null) return true;
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}