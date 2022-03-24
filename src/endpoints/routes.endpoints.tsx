const routes = {
    'default': '/publication',

    'userRoutes': '/user/*',
    'users': '/user',
    'userDetails': '/user/:id/detail',
    'userEdit': '/user/:id/edit',

    'personRoutes': '/person/*',
    'persons': '/person',
    'personDetail': '/person/:id/detail',
    'personEdit': '/person/:id/edit',
    'personDelete': '/person/:id/delete',


    'publications': '/publication',
    'institutions': '/institution',
    'register': '/register',
    'login': '/login',
    'logout': '/logout',
    'unauthorized': '/unauthorized'
}

export default routes;