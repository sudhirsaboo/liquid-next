/**
 * Created by ssaboo on 4/28/16.
 */
/**
 * Created by ssaboo on 4/5/16.
 */
import Model from "./Model";
export default class Authed extends Model {
    roles: any;

    constructor(props) {
        super(props);
        if (!this.roles) this.roles = [];
    }

    hasRoles(roles) {
        for (let i = 0; i < roles.length; i++) {
            const roleName = roles[i];
            console.log("Auth:Checking role  " + roleName);

            const role = this.roles.find(elem => {
                return elem.name == roleName;
            });

            if (!role) {
                // allowed = false;
                console.log("Auth:Checking role  failed " + role);
                break;
            }
        }
        return false;
    }

    hasRole(roleName) {
        const role = this.roles.find(elem => {
            return elem.name == roleName;
        });

        if (!role) {
            return false;
        }
        return true;
    }
}
