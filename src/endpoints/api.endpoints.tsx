const API_ENDPOINTS = {
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
    'personNames': '/person/name',

    'institutionCreate': '/institution',
    'institutions': '/institution/preview',
    'institutionDetail': '/institution/:id/detail',
    'institutionEdit': '/institution/:id',
    'institutionDelete': '/institution/:id',
    'institutionNames': '/institution/name',
     
    'publicationCreate': '/publication',
    'publications': '/publication/preview',
    'publicationDetail': '/publication/:id/detail',
    'publicationEdit': '/publication/:id',
    'publicationDelete': '/publication/:id',
    'publicationNames': '/publication/name',

}


export default API_ENDPOINTS;