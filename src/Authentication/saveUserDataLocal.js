const saveUserInfoLocalStore = (userName, password , uniqueId , authorId) => {
    if (userName !== '' || password !== password || uniqueId !== uniqueId || authorId) {
        const userInfo = { userName, password , uniqueId , authorId};
        const convertSringfy = JSON.stringify(userInfo);
        localStorage.setItem('userData', convertSringfy);
    }
}


export default saveUserInfoLocalStore;