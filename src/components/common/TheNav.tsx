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
import ROUTES from '../../endpoints/routes.endpoints';
import useAuth from '../../hooks/auth/useAuth';
import ROLES from '../../constatns/roles.constants';
import LanguageIcon from '@mui/icons-material/Language';
import { Grid } from '@mui/material';
import { LOCALES } from '../../i18n/locales';
import { permissionHelper } from '../../helpers/permission.helper';

const ifSignedPages = ['publications', 'persons', 'institutions', 'logout'];
const ifNotSignedPages = ['login', 'register'];
const ifSignedEditorOrAdminPages = ['import']
const ifSignedAdminPages = ['users'];

const TheNav = () => {
    const { t, i18n } = useTranslation();
    const { auth } = useAuth();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElLan, setAnchorElLan] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenLanMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElLan(event.currentTarget);
    };

    const handleCloseLanMenu = () => {
        setAnchorElLan(null);
    };

    function getRoute(page: string): string {
        const result = (Object.keys(ROUTES) as (keyof typeof ROUTES)[]).find((key) => {
            return key === page;
        });
        if (result === undefined) {
            return ROUTES.default;
        }
        return ROUTES[result];
    }

    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls={anchorElNav ? "menu-appbar" : undefined}
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
                            {permissionHelper.hasRole(auth.roles, [ROLES.Editor, ROLES.Admin]) &&
                                ifSignedEditorOrAdminPages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link style={{ textDecoration: "none", color: "black" }}
                                                to={getRoute(page)}>
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
                                <Link
                                    style={{ textDecoration: "none", color: "white" }}
                                    to={getRoute(page)}>
                                    {t(page)}
                                </Link>
                            </Button>
                        ))}
                        {permissionHelper.hasRole(auth.roles, [ROLES.Editor, ROLES.Admin]) &&
                            ifSignedEditorOrAdminPages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link
                                        style={{ textDecoration: "none", color: "white" }}
                                        to={getRoute(page)}>
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
                    <Box sx={{ flexGrow: 0 }}>
                        <Grid container direction="row" spacing={2} alignItems="center">
                            {auth?.email &&
                                <Grid item xs>
                                    <span style={{ display: 'block' }}>{auth.email}</span>
                                    <span style={{ display: 'block' }}>[{auth.roles?.map(x => t(x.toLowerCase())).join(",")}]</span>
                                </Grid>}
                            <Grid item xs>
                                <IconButton
                                    size="large"
                                    aria-controls="menu-language"
                                    aria-haspopup="true"
                                    onClick={handleOpenLanMenu}
                                    color="inherit"
                                >
                                    <LanguageIcon />
                                </IconButton>
                                <Menu
                                    id="menu-language"
                                    anchorEl={anchorElLan}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElLan)}
                                    onClose={handleCloseLanMenu}
                                >
                                    {
                                        Object.keys(LOCALES).map((key, i) => {
                                            const loc = LOCALES[key as keyof typeof LOCALES];
                                            return (<MenuItem
                                                disabled={i18n.language === loc}
                                                key={i}
                                                onClick={() => {
                                                    i18n.changeLanguage(loc)
                                                    handleCloseLanMenu()
                                                }}>
                                                <Typography textAlign="center">
                                                    {t(key.toLowerCase())}
                                                </Typography>
                                            </MenuItem>)
                                        })}
                                </Menu>
                            </Grid>
                        </Grid>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default TheNav;