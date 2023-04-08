import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Layout from "./components/layout";

import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/home";
import Product from "./pages/product";
import ProductDetail from "./pages/product-detail";
import Login from "./pages/login";

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
