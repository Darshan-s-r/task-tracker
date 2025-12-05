import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import AppStore from './reduxStore/AppStore.ts';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={AppStore}>
    <App />
    </Provider>
    <ToastContainer />
    </BrowserRouter>
  </StrictMode>,
)
