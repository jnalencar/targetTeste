function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

function blockUserCRUDAccess() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você não tem acesso a essa funcionalidade');
        return false;
    }

    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.level === 3) {
        return true;
    } else {
        alert('Você não tem acesso a essa funcionalidade');
        return false;
    }
}

function blockTarefaCRUDAccess() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você não tem acesso a essa funcionalidade');
        return false;
    }

    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.level >= 2) {
        return true;
    } else {
        alert('Você não tem acesso a essa funcionalidade');
        return false;
    }
}