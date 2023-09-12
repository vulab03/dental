import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "./assets/images/logo.png"
import {Helmet,HelmetProvider} from 'react-helmet-async'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        // <React.StrictMode>
    
    <HelmetProvider>
        <Helmet>
        <title>Vulab Warranty</title>
            <meta property="og:image" content={logo} />
        </Helmet>
        <GlobalStyles>
            <App />
            <ToastContainer/>
        </GlobalStyles>
    </HelmetProvider>
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
