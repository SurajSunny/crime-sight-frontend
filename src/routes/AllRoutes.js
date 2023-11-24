import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
const Tabs = lazy(() => import("../common/Tabs"));
const Home = lazy(() => import("../common/Home"));

const AllRoutes = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />
                <Route
                    path="/queries"
                    element={
                        <Tabs />
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Suspense>
    );
};

export default AllRoutes;
