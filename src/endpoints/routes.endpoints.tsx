const routes = {
    'default': '/publication',

    'userRoutes': '/user/*',
    'users': '/user',
    'userDetails': '/user/:id/detail',
    'userEdit': '/user/:id/edit',

    'personRoutes': '/person/*',
    'persons': '/person',
    'personCreate': '/person/create',
    'personDetails': '/person/:id/detail',
    'personEdit': '/person/:id/edit',

    'institutionRoutes': '/institution/*',
    'institutions': '/institution',
    'institutionCreate': '/institution/create',
    'institutionDetails': '/institution/:id/detail',
    'institutionEdit': '/institution/:id/edit',
    
    'publicationRoutes': '/publication/*',
    'publications': '/publication',
    'publicationCreate': '/publication/create',
    'publicationDetails': '/publication/:id/detail',
    'publicationEdit': '/publication/:id/edit',

    'register': '/register',
    'login': '/login',
    'logout': '/logout',
    'unauthorized': '/unauthorized'
}

export default routes;