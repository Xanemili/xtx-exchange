import { useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import { getAssetData } from '../../fetches/asset'
import TradePanel from './TradePanel'
import AssetQuote from './AssetQuote'
import StockReChart from '../charts/StockReChart';
import CompanyInfo from './CompanyInfo';
import CompanyNews from './CompanyNews'
import {useParams} from 'react-router-dom';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useAppSelector } from '../../store/hooks';
import { selectToken } from '../../store/userSlice';
import { getTimeSeriesData } from '../../fetches/asset'

const Asset = () => {

  const token = useAppSelector(selectToken)
  const [asset, setAsset] = useState({})
  const [range, setRange] = useState('1m')
  const [interval, setInterval] = useState(1)
  const {symbol} = useParams();
  const [chartData, setChartData] = useState([])

  useEffect(()=> {

    (async() => {
        const dataRes = await getAssetData(symbol);
        setAsset(dataRes)
    })();
  }, [symbol, setAsset, token])

  useEffect(() => {
    (async () => {
      if (!token) {
        return
      }
      let newData = await getTimeSeriesData(token, symbol, range, interval)
      if (newData) {
        setChartData(newData)
      } else {
        let error = 'error' //intiate error snackbar here
        console.error(error)
      }
    })()
  }, [range, interval, symbol, token])

  const handleRange = (range, interval) => {
    setInterval(interval)
    setRange(range)
  }

  if(!asset){
    return null
  }

  return (
    <Container maxWidth="" sx={{ mt: 4, mb: 4}}>
      <Grid container spacing={3} justifyContent={'center'}>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={6}>
          <Paper className="chart" sx={{ marginBottom: 10 }}>
            <AssetQuote asset={asset}/>
            <StockReChart chartData={chartData} handleRange={handleRange}/>
          </Paper>
          <CompanyInfo asset={asset}/>
          <CompanyNews asset={asset}/>
        </Grid>
        <Grid item xs={3}>
          <TradePanel quote={asset.quote}/>
        </Grid>
      </Grid>
    </Container>
  );

}

export default Asset;
