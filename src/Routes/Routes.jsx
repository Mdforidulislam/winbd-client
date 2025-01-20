import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import LogIn from "../Pages/Log-In/LogIn";
import Register from "../Pages/Register/Register";
import AdminDashboard from './../DashBoard/AdminDashBoard/AdminDashBoard';
import TransitionReq from "../DashBoard/Sub-Admindashboard/Transation/TransitionReq";
import UsersOutLet from "../DashBoard/UsersDashBoard/UsersLayout";
import UserHome from "../DashBoard/UsersDashBoard/UsersPages/Home";
import PrivetRouter from "../MainLayOut/PrivetRouter/PrivetRouter";
import AllUsers from "../DashBoard/Sub-Admindashboard/UsersManagment/AllUsers";
import AdminHome from './../DashBoard/AdminDashBoard/AdminHome/AdminHome';
import AllSubAdmin from "../DashBoard/AdminDashBoard/AllSubAdmin/AllSubAdmin";
import ConfirmPay from "../DashBoard/UsersDashBoard/UsersPages/ConfirmPay";
import ReferralRegistrationPage from "../DashBoard/Sub-Admindashboard/RefferLink/ReferLink";
import ConfirmMsg from "../DashBoard/UsersDashBoard/UsersPages/ConfirmMsg";
import ForgotPass from "../Pages/Log-In/ForgotPass/ForgotPass";
import AddNumberPage from "../DashBoard/Sub-Admindashboard/AddTransation/AddNumberPage";
import CustomerCare from "../DashBoard/Sub-Admindashboard/CustomerCare/CustomerCare";
import Promotion from "../DashBoard/AdminDashBoard/Promotion/Promotion";
import AdminCustomerCare from "../DashBoard/AdminDashBoard/AddCustomerCare/AdminCustomerCare";
import AddLink from "../DashBoard/AdminDashBoard/AddLink/AddLink";
import ForgetPassword from "../DashBoard/Sub-Admindashboard/ForgetPassword/ForgetPassword";
import History from "../DashBoard/Sub-Admindashboard/History/History";
import ResetPassword from "../DashBoard/UsersDashBoard/UsersPages/Profile/ResetPassword/ResetPassword";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut />,
        children: [
            {
                path: "/login",
                element: <LogIn />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgotpassword",
                element: <ForgotPass />,
            }
        ]
    },

    // dashboard below 

    {
        path: "/dashboard",
        element: <PrivetRouter><AdminDashboard /></PrivetRouter>,
        children: [

            // main admin dashboard router================================
            {
                path: "/dashboard/admin",
                element: <PrivetRouter><AdminHome /></PrivetRouter>,
            },
            {
                path: "/dashboard/addSubAdmin/",
                element: <PrivetRouter><AllSubAdmin /></PrivetRouter>,
            },
            {
                path: '/dashboard/addLink',
                element: <PrivetRouter><AddLink /></PrivetRouter>
            },
            {
                path: '/dashboard/adminCustomerCare',
                element: <PrivetRouter><AdminCustomerCare /></PrivetRouter>
            },
            {
                path: '/dashboard/promotion',
                element: <PrivetRouter><Promotion /></PrivetRouter>
            },
            //    --------------------- Subadmin dashboard  routes    ------------------------
            // {
            //     path: '/dashboard/subAdmin/',
            //     element: <PrivetRouter ><SubadminHome /></PrivetRouter>,
            // },
            // {
            //     path: "/dashboard/notification",
            //     element: <PrivetRouter><Subnotifications /></PrivetRouter>

            // },
            {
                path: "/dashboard/transtionReq",
                element: <PrivetRouter><TransitionReq /></PrivetRouter>
            },
            {
                path: "/dashboard/history",
                element: <PrivetRouter><History /></PrivetRouter>
            },
            {
                path: '/dashboard/addNumber',
                element: <PrivetRouter><AddNumberPage /></PrivetRouter>
            },
            {
                path: '/dashboard/allUsers',
                element: <AllUsers />
            },
            {
                path: '/dashboard/customer-care',
                element: <PrivetRouter><CustomerCare /></PrivetRouter>
            },
            {
                path: '/dashboard/password',
                element: <PrivetRouter><ForgetPassword /></PrivetRouter>
            },
            {
                path: '/dashboard/refer',
                element: <PrivetRouter><ReferralRegistrationPage /></PrivetRouter>
            }
            // -------------------------------- all the end sub admin router =======================
        ]
    },

    {
        path: '/profile',
        element: <UsersOutLet />,
        children: [
            {
                path: '/profile/user',
                element: <PrivetRouter><UserHome /></PrivetRouter>
            },
            {
                path: '/profile/confirmpay',
                element: <PrivetRouter><ConfirmPay /></PrivetRouter>
            },
            {
                path: "/profile/confirm-message",
                element: <PrivetRouter><ConfirmMsg /></PrivetRouter>,
            },
            {
                path: "/profile/resetPassword",
                element: <PrivetRouter><ResetPassword /></PrivetRouter>,
            }
        ]
    }
]);

