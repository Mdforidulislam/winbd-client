

const getLocalUserData = () => {
    const getingUserData = localStorage.getItem('userData');
    const convertParsData = JSON.parse(getingUserData);

    const userName = convertParsData?.userName;
    const password = convertParsData?.password;
    return {userName ,password}
}


export default getLocalUserData