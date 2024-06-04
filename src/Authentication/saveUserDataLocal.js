const saveUserInfoLocalStore = (userName, password , uniqueId , authorId,role) => {
    if (userName !== '' || password !== password || uniqueId !== uniqueId || authorId || !role) {
        const userInfo = { userName, password , uniqueId , authorId, role};
        const convertSringfy = JSON.stringify(userInfo);
        localStorage.setItem('userData', convertSringfy);
    }
}


export default saveUserInfoLocalStore;