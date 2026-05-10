import {create} from "zustand/react";
import {SignInPayload, SignInResponse} from "@/types/dto/signIn.dto";
import {SignUpPayload, SignUpResponse} from "@/types/dto/signUp.dto";
import {UserDto} from "@/types/dto/user.dto";
import {ApiResponse} from "@/types/dto/general-api.dto";
import {post} from "@/lib/api";

interface AuthState {
    isAuthorized: boolean
    user: UserDto | null
    signIn: (credentials: SignInPayload) => Promise<ApiResponse<SignInResponse>>
    signOut: () => Promise<void>
    signUp: (credentials: SignUpPayload) => Promise<ApiResponse<SignUpResponse>>
}

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthorized: false,
    user: null,

    signIn: async(credentials: SignInPayload): Promise<ApiResponse<SignInResponse>> => {
        try {
            const res: ApiResponse<SignInResponse> = await post("/auth/sign-in", credentials);
            if(res.success) {
                set({ isAuthorized: true });
            }
            return res;
        }
        catch(err: unknown) {
            return err as ApiResponse<SignInResponse>;
        }
    },
    signOut: async(): Promise<void> => {
        const res = await post('/auth/logout');
        if(res.success) {
            set({ isAuthorized: false, user: null });
        }
    },
    signUp: async(credentials: SignUpPayload): Promise<ApiResponse<SignUpResponse>> => {
        try {
            return await post("/auth/sign-up", credentials)
        }
        catch(err: unknown) {
            return err as ApiResponse<SignInResponse>;
        }
    }
}))