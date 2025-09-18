
export type SignUpParams = {
    uid: string;
    name: string;
    email: string;
    password?: string;
};

export type SignInParams = {
    email: string;
    idToken: string;
};

export type User = {
    uid: string;
    name: string;
    email: string;
    profileURL?: string;
    resumeURL?: string;
};
