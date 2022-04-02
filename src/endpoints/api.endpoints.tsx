const API_ENDPOINTS = {
    'register': '/auth/register',
    'login': '/auth/login',
    'logout': '/auth/logout',
    'refreshToken': '/auth/refreshtoken',
    
    'users': '/user/detail',
    'userDetail': '/user/:id/detail',
    'userEdit': '/user/:id',
    'userRoleEdit': '/user/:id/role',

    'persons': '/person/preview',
    'personCreate': '/person',
    'personPreview': '/person/:id/preview',
    'personDetail': '/person/:id/detail',
    'personEdit': '/person/:id',
    'personDelete': '/person/:id',
    'personNames': '/person/name',

    'institutions': '/institution/preview',
    'institutionCreate': '/institution',
    'institutionPreview': '/institution/:id/preview',
    'institutionDetail': '/institution/:id/detail',
    'institutionEdit': '/institution/:id',
    'institutionDelete': '/institution/:id',
    'institutionNames': '/institution/name',
     
    'publications': '/publication/preview',
    'publicationCreate': '/publication',
    'publicationPreview': '/publication/:id/preview',
    'publicationDetail': '/publication/:id/detail',
    'publicationEdit': '/publication/:id',
    'publicationDelete': '/publication/:id',
    'publicationNames': '/publication/name',

    'import': '/import/upload/:importSystem'
}


export default API_ENDPOINTS;