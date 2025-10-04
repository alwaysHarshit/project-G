import React from 'react';
import Header from "../component/Header.jsx";
import Footer from "../component/Footer.jsx";
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div className={" flex flex-col min-h-screen w-full bg-gradient-to-br from-black via-slate-900 to-red-950 text-white"}>
            <Header/>
            <main className="flex-1 pt-30 pb-10">
                {<Outlet/>}
            </main>
            <Footer />
        </div>
    );
}

export default Layout;