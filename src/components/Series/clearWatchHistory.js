const clearWatchHistory = async (userId, userSeriesId, token) => {
    const response = await fetch(`https://dt162g-projekt-api.herokuapp.com/users/${userId}/series/${userSeriesId}/clear-watch-history`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const result = await response.json();

    if (response.status === 401 || response.status === 403) {
        logoutUser();
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return result;
}

export default clearWatchHistory;