import React, { useState } from 'react';

const ReportForm = props => {
  const [status, useStatus] = useState('login');
  return (
    <>
      <h1>{status}</h1>
    </>
  );
}

export default ReportForm;