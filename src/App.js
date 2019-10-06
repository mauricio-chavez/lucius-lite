import React from 'react';

import Layout from './components/Layout/Layout';
import ReportBuilder from './containers/ReportBuilder/ReportBuilder';
import { FirebaseContext } from './components/Firebase';

const App = () => {
  return (
    <Layout>
      <FirebaseContext.Consumer >
        {firebase => <ReportBuilder firebase={firebase} />}
      </FirebaseContext.Consumer>
    </Layout>
  );
}

export default App;
