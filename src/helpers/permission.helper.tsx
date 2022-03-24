export const permissionHelper = {
    hasRole,
}

function hasRole(roles : string[] | undefined, wantedRoles: string[] | undefined) : boolean {
    if(roles === undefined){
        return false;
    }
    if(wantedRoles === undefined) {
        return true;
    }
    for(let i = 0; i < wantedRoles.length; ++i) {
        if (roles.indexOf(wantedRoles[i]) !== -1) {
            return true;
        }
    }
    return false;
}