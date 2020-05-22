import React from 'react';
import './App.css';
import { AppContextProvider } from './Context/AppContext';
import { AppShell } from './Components';
function App() {
  return (
    <AppContextProvider>
      <AppShell></AppShell>
    </AppContextProvider>
  );
}

export default App;
