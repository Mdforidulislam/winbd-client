import { CustomChat, FacebookProvider } from 'react-facebook';

const FacebookChat = () => {
    return (
        <div>
            <FacebookProvider appId="1649902095776446">
                <CustomChat pageId="334719376390438" minimized={true} />
            </FacebookProvider>
        </div>
    );
};

export default FacebookChat;


