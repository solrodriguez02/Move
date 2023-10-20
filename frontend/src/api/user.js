import { Api } from "./api.js";

export { UserApi, Credentials, PersonalInfo, EmailVerificationInfo}

class UserApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/users${ slug ? `/${slug}` : ""}`;
    }

    static async register(personalInfo, controller){
        return await Api.post(UserApi.getUrl(), false, personalInfo, controller);
    }

    static async verifyEmail(emailVerificationInfo, controller){
        return await Api.post(UserApi.getUrl('verify_email'), false, emailVerificationInfo, controller);
    }

    static async login(credentials, controller) {
        return await Api.post(UserApi.getUrl('login'), false, credentials, controller);
    }

    static async logout(controller) {
        await Api.post(UserApi.getUrl('logout'), true, controller);
    }

    static async getCurrent(controller) {
        return Api.get(UserApi.getUrl('current'), true, controller);
    }

    static async logout(personalInfo, controller) {
        await Api.put(UserApi.getUrl('logout'), true, personalInfo, controller);
    }

    static async getCurrentRoutines(controller) {
        return Api.get(UserApi.getUrl('current/routines'), true, controller);
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}

class PersonalInfo {
    constructor(username, password, firstName, lastName, email){
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.gender = "male",
        this.birthdate = 284007600000,
        this.phone = "98295822",
        this.avatarUrl= "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        this.metadata = null
    }
}

class EmailVerificationInfo {
    constructor(email,code){
        this.email = email;
        this.code = code;
    }
}