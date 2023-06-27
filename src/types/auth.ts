export interface ParamLogin {
    account: string;
    password: string;
}

export interface User {
    userId: number;
    userIdStr: string;
    account: string;
    email: string;
    fullname: string;
    isDebugModeOn: boolean;
    userName: string | null;
    last_Name: string | null;
    first_Name: string | null;
    contactNumber: string | null;
    companyID: number;
    companyName: string | null;
    projectId: number;
    projectTitle: string | null;
    roleTitle: string | null;
    administrator: string | null;
}

// User selected
export interface UserSelects {
    userId: number;
    userName: string;
    isAdmin: boolean;
}

// user selected List
export interface UserSelectList {
    userSelects: UserSelects[];
}
