export interface UserLogin {
    displayName: string;
    email: string;
    username: number;
    password: number;
    token: string;
}

export interface LoginQuery {
    username: string,
    password: string
}

export interface SignupQuery {
    username: string,
    displayName: string,
    password: string,
    email: string
}