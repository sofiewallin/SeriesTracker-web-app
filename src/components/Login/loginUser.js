const loginUser = async credentials => {
    const response = await fetch('https://dt162g-projekt-api.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
    });

    const result = await response.json();

    if (!response.ok) {
        const error = document.querySelector('.error');
        error.classList.add('is-active');
        error.innerHTML = 'The username or password you have entered is invalid.';
        throw new Error(response.statusText);
    }

    return result;
}

export default loginUser;