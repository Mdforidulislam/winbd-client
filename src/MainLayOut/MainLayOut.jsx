import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const MainLayout = () => {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {

      navigate('/login')
    }, []);

    return (
        <div className=''>
            <Outlet />
        </div>
    );
};

export default MainLayout;