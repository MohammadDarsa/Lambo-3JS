import React, { useState } from 'react';
import StartedContext from './StartedContext';

const StartedContextProvider = ({ children }) => {
  const [startedContext, setStartedContext] = useState(false);

  const updateStartedContext = (newValue) => {
    setStartedContext(newValue);
  };

  return (
    <StartedContext.Provider value={{ startedContext, updateStartedContext }}>
      {children}
    </StartedContext.Provider>
  );
};

export default StartedContextProvider;