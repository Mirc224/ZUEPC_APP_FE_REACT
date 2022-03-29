const apiEndoints = {
    'register': '/auth/register',
    'login': '/auth/login',
    'logout': '/auth/logout',
    'refreshToken': '/auth/refreshtoken',
    
    'users': '/user/detail',
    'userDetail': '/user/:id/detail',
    'userEdit': '/user/:id',
    'userRoleEdit': '/user/:id/role',

    'personCreate': '/person',
    'persons': '/person/preview',
    'personDetail': '/person/:id/detail',
    'personEdit': '/person/:id',
    'personDelete': '/person/:id',

    'institutionCreate': '/institution',
    'institutions': '/institution/preview',
    'institutionDetail': '/institution/:id/detail',
    'institutionEdit': '/institution/:id',
    'institutionDelete': '/institution/:id',

}


export default apiEndoints;