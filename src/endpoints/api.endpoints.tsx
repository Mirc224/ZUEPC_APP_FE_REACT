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
    'persons': '/person/detail',
    'personDetail': '/person/:id/detail',
    'personEdit': '/person/:id',
    'personDelete': '/person/:id',

}


export default apiEndoints;