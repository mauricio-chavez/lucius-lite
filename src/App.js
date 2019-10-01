import React from 'react';

import Layout from './components/Layout/Layout';
import ReportForm from './containers/ReportForm/ReportForm';

const App = () => {
  return (
    <Layout>
      <h1>Lucius Lite</h1>
      <p>Cree su reporte aquí</p>
      <ReportForm />
    </Layout>
  );
}

export default App;
