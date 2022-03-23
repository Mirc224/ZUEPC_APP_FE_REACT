import { Container, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router'
import { LOCALES } from '../i18n/locales';
import TheNav from './TheNav'

type Props = {}

const Layout = (props: Props) => {
  const { i18n } = useTranslation();
  return (
    <main className="App">
        <TheNav />
        <Container maxWidth="xl" >
          <Outlet/>
        </Container>
        <hr />
        <button onClick={() => i18n.changeLanguage(LOCALES.SLOVAK)}>Slovak</button>
        <button onClick={() => i18n.changeLanguage(LOCALES.ENGLISH)}>English</button>
    </main>
  )
}

export default Layout