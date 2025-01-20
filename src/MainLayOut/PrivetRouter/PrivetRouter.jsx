import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Authentication/Authentication";


const PrivetRouter = ({ children }) => {
    const [delayPassed, setDelayPassed] = useState(false);
    const { role } = useContext(AuthContext);
    const userLocation = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelayPassed(true);
        }, 2000); // 2 seconds
        return () => clearTimeout(timer);
    }, []);

    if (!role && !delayPassed) {
        return (
            <div className="bg-gray-800 min-h-screen flex justify-center items-center">
                <div className="text-white text-center">
                    <div className="mb-4 flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-t-4 border-white rounded-full animate-ping"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!role || role === 'undefined' || role === undefined) {
        return <Navigate to="/login" replace={true} />;
    }

    // =================================== start the router validation ==========================
    if (role === 'user') {
        if (userLocation.pathname === '/profile/user' ||
            userLocation.pathname === '/profile/confirmpay' ||
            userLocation.pathname === '/profile/resetPassword' ||
            userLocation.pathname === '/profile/confirm-message') {
            return children;
        } else {
            return <Navigate to="/login" replace={true} />;
        }
    } else if (role === 'subAdmin') {
        const subAdminPaths = [
            // '/dashboard/subAdmin',
            // '/dashboard/notification',
            '/dashboard/transtionReq',
            '/dashboard/addNumber',
            '/dashboard/addtranstion',
            '/dashboard/allUsers',
            '/dashboard/refer',
            '/dashboard/history',
            '/dashboard/customer-care',
            '/dashboard/password',

        ];
        if (subAdminPaths.includes(userLocation.pathname)) {
            return children;
        } else {
            return <Navigate to="/login" replace={true} />;
        }
    } else if (role === 'admin') {
        const adminPaths = [
            '/dashboard/admin',
            '/dashboard/addSubAdmin',
            '/dashboard/instructionPay/',
            '/dashboard/promotion',
            '/dashboard/addLink',
            '/dashboard/adminCustomerCare'
        ];
        if (adminPaths.includes(userLocation.pathname)) {
            return children;
        } else {
            return <Navigate to="/login" replace={true} />;
        }
    }

    return null; 
};

export default PrivetRouter;
