import { isCursorAtEnd } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react';
import './App.css';
import { getAllUsers } from './client';
import Container from './Container';
import { Avatar, Table, Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
const getIndicatorIcon = () => <LoadingOutlined style={{fontSize: 24,}}spin/>;

class App extends Component {
  
  state = {
    users: [],
    isFetching: false
  }
  
  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    this.setState({
      isFetching: true
    });
    getAllUsers()
        .then(res => res.json()
        .then(users => {
          this.setState({
            users,
            isFetching: false
          });
        }));
  }

  render() {
    const { users, isFetching } = this.state;

    if (isFetching) {
      return (
        <Container>
          <Spin indicator={getIndicatorIcon()}/>
        </Container>
      )
    }

    if (users && users.length) {
      console.log(users)
      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text, user) => ( // why
            <Avatar size='large'>
              {`${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
          )
        },
        {
          title: 'User Id',
          dataIndex: 'userId',
          key: 'userId'
        },
        {
          title: 'First Name',
          dataIndex: "firstName",
          key: "firstName"
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName'
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email'
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender'
        }
      ];
      return (
        <Container>
          <Table 
          dataSource={users} 
          columns={columns}
          pagination={false}
          rowKey='userId' />
        </Container>
      );
    } // end if
    return (<h1>No users found.</h1>)
  }

}

export default App;
