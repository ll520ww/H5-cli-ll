import React, {useMemo} from "react";
import {BrowserRouter, Routes, useLocation} from "react-router-dom";
import Home from "@/pages/home"
import Test from "@/pages/test";

const Router = () => {
    const location = useLocation()
    const Component:any= useMemo(()=>{
        if (location.pathname.includes("/test")) {
            return <Test></Test>
        }
        if (location.pathname.includes("/")) {
            return <Home></Home>
        }

    },[location.pathname])
    return Component
}


export const App = () => {
    return (
        <BrowserRouter basename={__PATH__}>
            <Router></Router>
        </BrowserRouter>
    );
};


