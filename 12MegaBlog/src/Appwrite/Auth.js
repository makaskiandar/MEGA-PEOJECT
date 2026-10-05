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
            const UserAccount = await this.account.create(ID.unique(), email, password, name);
            if (UserAccount) {
                this.login({ email, password });//call login
            }
            else {
                return UserAccount;
            }
        }
        catch (error) {
            throw error;
        }

    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    async GetCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            console.log("Appwrite Service:: GetCurrentUser::error", error);
        }
        return null;
    }
   

    async Logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            console.log("Appwrite Service:: Logout::error", error);
        }
    }


}
const authservice = new AuthService();
export default authservice