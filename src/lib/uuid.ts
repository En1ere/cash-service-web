import { v4 as uuidv4 } from "uuid";

const USER_ID_KEY = "user_uuid";

export const getUserUUID: () => string = (): string => {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (stored) return stored;

    const id = uuidv4();
    localStorage.setItem(USER_ID_KEY, id);
    return id;
};

export const updateUUID = (id: string) => {
    localStorage.setItem(USER_ID_KEY, id);
};
