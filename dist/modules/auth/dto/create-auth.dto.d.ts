export declare class CreateAuthDto {
}
export declare enum LoginRole {
    CUSTOMER = "CUSTOMER",
    ADMIN = "DELIVERY"
}
export declare enum Platform {
    ANDROID = "ANDROID",
    IOS = "IOS",
    WEB = "WEB"
}
export declare class LoginDTO {
    mobile: string;
    deviceId: string;
    platform: string;
    role: LoginRole;
}
