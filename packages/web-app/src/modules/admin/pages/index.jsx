import React, { PropTypes } from 'react';
import ListPage from 'modules/todos/pages/List';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from './Dashboard';

const Admin = ({ match: { url } }) => (
  <Layout>
    <Route exact path={url} component={Dashboard} />
    <Route path={`${url}/lists/:listId`} component={ListPage} />
  </Layout>
);

Admin.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

export default Admin;
