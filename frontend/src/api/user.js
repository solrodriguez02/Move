import { Api } from "./api.js";

export { UserApi, Credentials, PersonalInfo, EmailVerificationInfo, EditedPersonalInfo}

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

    static async modifyCurrent(personalInfo, controller) {
        return Api.put(UserApi.getUrl('current'), true, personalInfo, controller);
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
    constructor(username, password, firstName, lastName, email) {
        this.username = username,
        this.password = password,
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.gender = 'male',
        this.birthdate = 0,
        this.phone = '-',
        this.avatarUrl= 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        this.metadata = null
    }
}

class EmailVerificationInfo {
    constructor(email,code){
        this.email = email;
        this.code = code;
    }
}

class EditedPersonalInfo {
     constructor(firstName, lastName, gender, phone, avatarUrl ) {
        this.firstName = firstName, 
        this.lastName = lastName,
        this.gender = gender,
        this.birthdate = 0,
        this.phone = phone,
        this.avatarUrl = avatarUrl
        this.metadata = null
     }
}