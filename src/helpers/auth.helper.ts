import jwt from 'jsonwebtoken';

let token: string | null = null;
let username = '';
export function getToken(): string | null {
    if (token)
        return token;
    token = localStorage.getItem('token');
    return token;
}

export function saveToken(token: string): void {
    localStorage.setItem('token', token);
}

export function getAuthHeader(): { Authorization?: string } {
    const token = getToken();
    return token ? { Authorization: token } : { };
}

export function isLoggedIn(): boolean {
    return (getToken() ? true : false);
}

export function getUsername(): string {
    if (username)
        return username;
    if (token) {
        username = (jwt.decode(token) as any)['username'] ?? '';
        return username;
    }
    return '';
}

export function logout() {
    token = null;
    username = '';
    localStorage.removeItem('token');
}
