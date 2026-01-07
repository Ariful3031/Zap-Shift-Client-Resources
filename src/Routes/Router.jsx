import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/HomePages/Home";
import Coverage from "../Pages/CoveragePage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/AuthenticationPage/Login";
import Register from "../Pages/AuthenticationPage/Register";
import PrivateRoute from "./PrivateRoute";
import Rider from "../Pages/Rider/Rider";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/DashboardPage/MyParcels";
import Payment from "../Pages/DashboardPage/payment/Payment";
import PaymentSuccess from "../Pages/DashboardPage/payment/PaymentSuccess";
import PaymentCancel from "../Pages/DashboardPage/payment/PaymentCancel";
import PaymentHistory from "../Pages/DashboardPage/payment/PaymentHistory";
import ApproveRiders from "../Pages/DashboardPage/ApproveRiders";
import UsersManagement from "../Pages/DashboardPage/UsersManagement";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/rider',
        element: <PrivateRoute>
          <Rider></Rider>
        </PrivateRoute>,
        loader: () => fetch('/services-Center.json').then(res => res.json())
      },
      {
        path: '/send-parcel',
        element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>,
        loader: () => fetch('/services-Center.json').then(res => res.json())
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('/services-Center.json').then(res => res.json())
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register

      }
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children:[
      {
        path:'my-parcels',
        Component: MyParcels
      },
      {
        path:'payment/:parcelId',
        Component: Payment
      },
      {
        path:'payment-success',
        Component: PaymentSuccess
      },
      {
        path:'payment-history',
        Component: PaymentHistory
      },
      {
      path:'approve-riders',
      Component: ApproveRiders
      },
      {
        path:'payment-cancelled',
        Component: PaymentCancel
      },
      {
        path:'users-management',
        Component: UsersManagement
      }
    ]
  }
]);
