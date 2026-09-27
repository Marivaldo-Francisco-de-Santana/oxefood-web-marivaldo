import Router from "./app/router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {

    return (
        <>
            <Router />

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
        </>
    );

}

