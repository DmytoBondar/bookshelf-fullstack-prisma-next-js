export type IGenericResponse<T> = {
    meta: {
        page: number;
        limit: number;
        total: number;
    };
    data: T;
};

export type IAuthUserProps = {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
}