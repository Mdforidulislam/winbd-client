
import React, { useEffect } from 'react';

const FacebookMessengerChat = () => {
    useEffect(() => {
        // Initialize Facebook SDK
        if (window.FB) {
            window.FB.init({
                xfbml: true,
                version: 'v10.0',
            });
        } else {
            // Load Facebook SDK asynchronously
            const fbScript = document.createElement('script');
            fbScript.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            fbScript.async = true;
            fbScript.defer = true;
            fbScript.crossOrigin = 'anonymous';
            fbScript.onload = () => {
                window.FB.init({
                    xfbml: true,
                    version: 'v10.0',
                });
            };
            document.body.appendChild(fbScript);
        }
    }, []);

    return null;
};

export default FacebookMessengerChat;