const logoutUser = async () => {
    localStorage.removeItem('token');
    window.location.reload(false);
}

export default logoutUser;