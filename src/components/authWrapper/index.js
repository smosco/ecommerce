import React from 'react';
import './styles.scss';

const AuthWrapper = ({ headline, children }) => {
  return (
    <div className='authWrapper'>
      <div className='wrap'>
        <h2>{headline && headline}</h2>
        <div className='children'>{children && children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;
