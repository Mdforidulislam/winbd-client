

const getLocalUserData = () => {
    const getingUserData = localStorage.getItem('userData');
    const convertParsData = JSON.parse(getingUserData);

    const userName = convertParsData?.userName;
    const password = convertParsData?.password;
    const role = convertParsData?.role;
    return {userName ,password,role}
}


export default getLocalUserData