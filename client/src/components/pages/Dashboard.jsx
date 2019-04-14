import React, { Component } from 'react'
import axios from 'axios'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import overlayFactory from 'react-bootstrap-table2-overlay';

import { Consumer } from '../store/context'

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

    state = {
        data: []
    }

    componentDidMount() {
        const url = 'api/users/dashboard'

        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1Yzk4ZjgwY2VlMzQxZDIwYWM4NjAxZGMiLCJuYW1lIjoiUm9wYWxpIE11bnNoaSIsImVtYWlsIjoicm9wYWxpQGdtYWlsLmNvbSIsImlhdCI6MTU1NDEzMjgwOX0.W-I2bs2oWBaCWe7Er-vZeQKw3LiSQMk_AZD-ZeOIqec'

        axios.get(url, {
            headers: {
                Authorization: token
            }
        })
            .then((response) => {

                let urls = response.data.urls
                urls = urls.map((url) => { return { ...url, shortUrl: axios.defaults.baseURL + '/' + url.urlCode } });
                this.setState({ data: urls })

            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        return (
            <Consumer>
                {value => {
                    const { user } = value

                    return (
                        isEmpty(user) ? <h3 className="center-align">Please Login To View Dashboard...</h3> : (
                            < BootstrapTable keyField='shortUrl'
                                data={this.state.data}
                                columns={columns}
                                bordered={true}
                                hover={true}
                                overlay={overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' })}
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