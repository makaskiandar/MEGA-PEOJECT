import conf from "../conf/Conf";
import { Client, Account, ID } from 'appwrite';
export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            if (this.account.createEmailPasswordSession) {
                return await this.account.createEmailPasswordSession(email, password);
            } else {
                return await this.account.createEmailSession(email, password);
            }
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error?.code !== 401) {
                console.log("Appwrite Service:: getCurrentUser::error", error);
            }
        }
        return null;
    }

    GetCurrentUser() {
        return this.getCurrentUser();
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service:: logout::error", error);
        }
    }

    Logout() {
        return this.logout();
    }
}
const authservice = new AuthService();
export default authservice