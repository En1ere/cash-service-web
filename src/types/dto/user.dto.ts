import {UserGender} from "@/types/const/UserGender"

export interface UserDto {
    login: string;
    name: string;
    email: string;
    uuid: string;
    lastName: string;
    patronymic: string;
    avatar: string;
    gender: UserGender;
    dateOfBirth: Date;
    createdAt: Date;
}