import React from 'react';

import './Layout.css';

const Layout = props => (
  <section className="Layout">
    <div className="FormsContainer card">
      <div className="card-body">
        {props.children}
      </div>
    </div>
  </section>
)

export default Layout;