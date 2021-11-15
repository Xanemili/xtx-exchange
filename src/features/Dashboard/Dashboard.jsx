import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Portfolio from './Portfolio'
import PortfolioChart from './PortfolioChart'
import NewsContainer from './NewsContainer';
import CurrentBalance from './CurrentBalance'
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';
import ListSection from '../Lists/ListSection';
import { Toolbar } from '@mui/material'
import SimpleConfirm from '../Messages/SimpleConfirm'
import { selectDialog } from '../../store/alertSlice'

const DashBoard = () => {
  const token = useAppSelector(selectToken)
  const dialog = useAppSelector(selectDialog)
  if (!token) {
    return null
  }
  return (
    <Container maxWidth="" sx={{ mt: 4, mb: 4 }}>
      <SimpleConfirm open={dialog.open}/>
      <Grid container spacing={3} justifyContent='center'>
        <Grid item xs={2}>
          <Portfolio />
        </Grid>
        <Grid item xs={8}>
          <PortfolioChart />
          <CurrentBalance />
          {
            // NEWS CONTAINER FUNCTIONAL
          }
          {/* <NewsContainer /> */}
        </Grid>
        <Grid item xs={2}>
          <ListSection />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DashBoard;
