
let token: string | null = null;
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
    if (token)
        return { Authorization: getToken() ?? '' };
    return {};
}
