export interface SignUpPayload {
    name: string;
    login: string;
    email: string;
    password: string;
}

export interface SignUpResponse {
    accessToken: string;
    refreshToken: string;
}
