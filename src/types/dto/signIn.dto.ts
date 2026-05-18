export interface SignInPayload {
    identifier: string;
    password: string;
}

export interface SignInResponse {
    accessToken: string;
    refreshToken: string;
}
