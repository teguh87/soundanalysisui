import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(process.env.PUBLIC_URL)
const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`,
};
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeSwitcherProvider themeMap={themes} defaultTheme="light">
        <App />
      </ThemeSwitcherProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
