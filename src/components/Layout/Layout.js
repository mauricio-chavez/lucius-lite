import React from 'react';

import './Layout.css';

const Layout = props => (
  <section className="Layout">
    <div className="FormsContainer">
      { props.children }
    </div>
  </section>
) 

export default Layout;