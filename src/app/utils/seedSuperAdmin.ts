import { envVar } from "../config/env";
import { IAuthProvider, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from "bcrypt";

export const seedSuperAdmin = async() => {
    try {
        const isSuperAdminExits = await User.findOne({ email: envVar.SUPER_ADMIN_EMAIL});
        if(isSuperAdminExits){
            console.log("Super_Admin exits");
            return;
        }

        const authProvider: IAuthProvider = {
            provider: "credentials",
            providerId: envVar.SUPER_ADMIN_EMAIL
        }


        const adminPassHashed = await bcrypt.hash(envVar.SUPER_ADMIN_PASSWORD, Number(envVar.BECRYPT_SALT_ROUND));
        const payload = {
            name: "SUPER_ADMIN",
            role: Role.SUPER_ADMIN,
            email: envVar.SUPER_ADMIN_EMAIL,
            password: adminPassHashed,
            isVerified: true,
            auths: [authProvider]

        }

        const superAdmin = await User.create(payload);
        console.log(superAdmin);

    } catch (error) {
        console.log(error);
    }

}