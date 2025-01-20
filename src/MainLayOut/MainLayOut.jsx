import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const MainLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {

      navigate('/login')
    }, []);

    return (
        <div className='bg-black'>
            <Outlet />
        </div>
    );
};

export default MainLayout;