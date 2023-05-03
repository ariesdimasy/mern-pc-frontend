import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Layout from "./components/layout";
import DashboardLayout from "./components/DashboardLayout";

import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/home";
import Product from "./pages/product";
import ProductDetail from "./pages/product-detail";
import Login from "./pages/login";
import Register from "./pages/register";
import Category from "./pages/dashboard/category";
import ProductDashboard from "./pages/dashboard/product";
import Index from "./pages/dashboard/index";

import store from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";

const authStorage = JSON.parse(localStorage.getItem("authStorage"));

const ProtectedAuthRoute = (props) => {
  const { authStorage, redirectPath = "/" } = props;

  if (authStorage?.token) {
    return <Navigate to={redirectPath} replace />;
  }
  return props.children ? props.children : <Outlet />;
  //return <Test />;
};

const ProtectedRoute = (props) => {
  const { authStorage, redirectPath = "/" } = props;

  if (
    authStorage?.authorization === "admin" ||
    authStorage?.authorization === "superadmin"
  ) {
    return props.children ? props.children : <Outlet />;
  }
  return <Navigate to={redirectPath} replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    forceRefresh: true,
    element: (
      <Layout>
        <Home authStorage={authStorage} />
      </Layout>
    ),
  },
  {
    path: "/product",
    forceRefresh: true,
    element: (
      <Layout>
        <Product authStorage={authStorage}></Product>
      </Layout>
    ),
  },
  {
    path: "/product/:id",
    forceRefresh: true,
    element: (
      <Layout>
        <ProductDetail authStorage={authStorage}></ProductDetail>
      </Layout>
    ),
  },
  {
    path: "/login",
    forceRefresh: true,
    element: (
      <ProtectedAuthRoute authStorage={authStorage}>
        <Layout>
          <Login authStorage={authStorage}></Login>
        </Layout>
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/register",
    forceRefresh: true,
    element: (
      <ProtectedAuthRoute authStorage={authStorage}>
        <Layout>
          <Register authStorage={authStorage}></Register>
        </Layout>
      </ProtectedAuthRoute>
    ),
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute authStorage={authStorage}>
        <DashboardLayout>
          <Index authStorage={authStorage}></Index>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard/category",
    element: (
      <ProtectedRoute authStorage={authStorage}>
        <DashboardLayout>
          <Category authStorage={authStorage}></Category>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin-dashboard/product",
    element: (
      <ProtectedRoute authStorage={authStorage}>
        <DashboardLayout>
          <ProductDashboard authStorage={authStorage}></ProductDashboard>
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" replace></Navigate>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);

/*
  <Routes>
    <Route
      path="/"
      element={<Home authStorage={authStorage} />}
    ></Route>
    <Route
      path="/product"
      element={<Product authStorage={authStorage} />}
    ></Route>
    <Route
      path="/product/:id"
      element={<ProductDetail authStorage={authStorage} />}
    ></Route>
    <Route
      path={"/login"}
      component={
        <ProtectedAuthRoute authStorage={authStorage}>
          <Login authStorage={authStorage}></Login>
        </ProtectedAuthRoute>
      }
    ></Route>
    <Route
      path={"*"}
      component={<Home authStorage={authStorage} />}
    ></Route>
  </Routes>
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
