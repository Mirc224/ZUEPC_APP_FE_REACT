import { Container, Paper, TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router'
import TheNav from './TheNav'

type Props = {}

const Layout = (props: Props) => {
  return (
    <main className="App">
        <TheNav />
      <Container 
      maxWidth="xl" 
      style={{
        minWidth: '25%'
      }}>
        <Paper>
          <Box sx={{ p: 2, m: 1 }}>
            <Outlet/>
          </Box>
        </Paper>
        </Container>
    </main>
  )
}

export default Layout