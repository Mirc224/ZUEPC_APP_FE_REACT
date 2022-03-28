import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import routes from '../../endpoints/routes.endpoints';
import useAuth from '../../hooks/auth/useAuth';
import ROLES from '../../constatns/roles.constants';

const ifSignedPages = ['publications', 'persons', 'institutions', 'logout'];
const ifNotSignedPages = ['login', 'register'];
const ifSignedAdminPages = ['users'];

const TheNav = () => {
    const { t } = useTranslation();
    const { auth } = useAuth();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    function getRoute(page: string): string {
        const result = (Object.keys(routes) as (keyof typeof routes)[]).find((key) =>{
            return key === page;
        });
        if(result === undefined)
        {
            return routes.default;
        }
        return routes[result];
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <p>{JSON.stringify(auth)}</p>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {auth.roles?.includes(ROLES.Admin) && ifSignedAdminPages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link style={{ textDecoration: "none", color: "black" }} to={getRoute(page)}>
                                            {t(page)}
                                        </Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                            {auth.id && ifSignedPages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink style={{ textDecoration: "none", color: "black" }} to={getRoute(page)}>
                                            {t(page)}
                                        </NavLink>
                                    </Typography>
                                </MenuItem>
                            ))}
                            {!auth.id && ifNotSignedPages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <NavLink style={{ textDecoration: "none", color: "black" }} to={getRoute(page)}>
                                            {t(page)}
                                        </NavLink>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {auth.roles?.includes(ROLES.Admin) && ifSignedAdminPages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link style={{ textDecoration: "none", color: "white" }} to={getRoute(page)}>
                                    {t(page)}
                                </Link>
                            </Button>
                        ))}
                        {auth.id && ifSignedPages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link style={{ textDecoration: "none", color: "white" }} to={getRoute(page)}>
                                    {t(page)}
                                </Link>
                            </Button>
                        ))}
                        {!auth.id && ifNotSignedPages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Link style={{ textDecoration: "none", color: "white" }} to={getRoute(page)}>
                                    {t(page)}
                                </Link>
                            </Button>
                        ))}
                    </Box>
                    {auth?.email ?  
                    <Box sx={{ flexGrow: 0 }}>
                        <span style={ {display: 'block'}}>{auth.email}</span>
                        <span style={{ display: 'block' }}>[{auth.roles?.map(x => t(x.toLowerCase())).join(",")}]</span>
                    </Box>
                    : <></>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default TheNav;