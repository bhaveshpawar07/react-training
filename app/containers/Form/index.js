/**
 *
 * Form Container
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Card, Input, Button } from 'antd';
import { injectSaga } from 'redux-injectors';
import { selectUserdata } from './selectors';
import saga from './saga';
import { formCreators } from './reducer';

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${(props) => props.maxwidth};
    color: ${(props) => props.color};
    ${(props) => props.color && `color: ${props.color}`};
  }
`;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;

export function Form({ dispatchAddUserData, dispatchRemoveUser, dispatchEditUserData, somePayLoad }) {
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState('');

  const [inputField, setInputField] = useState({
    name: '',
    mobile: '',
    email: ''
  });

  const onChangeName = (e) => {
    // setInputField({name:e.target.value})
    const val = e.target.value;
    setInputField((prevState) => ({
      ...prevState,
      name: val
    }));
  };
  const onChangeMobile = (e) => {
    // setInputField({mobile:e.target.value})
    const val = e.target.value;
    setInputField((prevState) => ({
      ...prevState,
      mobile: val
    }));
  };
  const onChangeEmail = (e) => {
    // setInputField({email:e.target.value})
    const val = e.target.value;
    setInputField((prevState) => ({
      ...prevState,
      email: val
    }));
  };

  const style = {
    margin: '0px'
  };
  const onSubmit = () => {
    dispatchAddUserData(inputField);
    setInputField((prevState) => ({
      ...prevState,
      name: '',
      email: '',
      mobile: ''
    }));
    // alert(JSON.stringify(inputField));
  };

  const onEdit = () => {
    dispatchEditUserData(inputField, index);
    setInputField((prevState) => ({
      ...prevState,
      name: '',
      email: '',
      mobile: ''
    }));
    setEdit(false);
    // alert(JSON.stringify(inputField));
  };

  const editUser = (user, index) => {
    setEdit(true);
    setIndex(index);
    setInputField((prevState) => ({
      ...prevState,
      name: user.name,
      email: user.email,
      mobile: user.mobile
    }));
  };

  const renderUsers = () => {
    return somePayLoad.map((user, index) => {
      return (
        <div key={index}>
          <h1 style={style}>{user.name}</h1>
          <p>
            {user.mobile},{user.email}
          </p>
          <p onClick={() => editUser(user, index)}>Edit</p>
          <p onClick={() => dispatchRemoveUser(index)}>Delete</p>
        </div>
      );
    });
  };

  return (
    <Container maxwidth="500" padding="10">
      <CustomCard title="Add user">
        <Input onChange={onChangeName} value={inputField.name} placeholder="Enter Name" />
        <br />
        <br />
        <Input type="number" onChange={onChangeMobile} value={inputField.mobile} placeholder="Enter Mobile" />
        <br />
        <br />
        <Input onChange={onChangeEmail} value={inputField.email} placeholder="Enter Email" />
        <br />
        <br />
        {!edit && (
          <Button type="primary" onClick={() => onSubmit()}>
            Submit
          </Button>
        )}
        {edit && (
          <Button type="primary" onClick={() => onEdit()}>
            Edit
          </Button>
        )}
        &nbsp;
        {edit && (
          <Button danger onClick={() => setEdit(false)}>
            Discard
          </Button>
        )}
      </CustomCard>
      <br />
      <CustomCard title="Registered Users">{renderUsers()}</CustomCard>
    </Container>
  );
}

Form.propTypes = {
  somePayLoad: PropTypes.any,
  dispatchAddUserData: PropTypes.func,
  dispatchRemoveUser: PropTypes.func,
  dispatchEditUserData: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  somePayLoad: selectUserdata()
});

function mapDispatchToProps(dispatch) {
  const { addUserData, removeUser, editUser } = formCreators;
  return {
    dispatchAddUserData: (userData) => dispatch(addUserData(userData)),
    dispatchRemoveUser: (userKey) => dispatch(removeUser(userKey)),
    dispatchEditUserData: (editUserData, index) => dispatch(editUser(editUserData, index))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectSaga({ key: 'form', saga }))(Form);

export const FormTest = compose(injectIntl)(Form);
