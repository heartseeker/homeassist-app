import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  makeStyles,
} from '@material-ui/core';
import MainLayout from '../../components/MainLayout/MainLayout';
import FinancialLiteracy from '../../assets/images/financial-literacy.png';
import PagIbigFund from '../../assets/images/pag-ibig-fund.png';
import BankFinancing from '../../assets/images/bank-financing.png';
import HomeAssist from '../../assets/images/homeassist.png';
import PropertyChoice from '../../assets/images/property-choice.png';
import PropertySales from '../../assets/images/property-sales.png';

const useStyles = makeStyles({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '50rem',
    alignSelf: 'center',
  },
  title: {
    marginBottom: '1rem',
  },
  tiles: {
    display: 'flex',
    marginBottom: '1rem',
  },
  cell: {
    // display: 'flex',
    width: '22rem',
    height: '20rem',
    marginRight: '1rem',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '80.25%', // 16:9
  },
});

const HomeBuyersGuide = () => {
  const classes = useStyles();

  return (
    <MainLayout>
      <div className={classes.paper}>
        <h1 className={classes.title}>Home Buyers Guide</h1>
        <div className={classes.column}>
          <div className={classes.tiles}>
            <Card className={classes.cell}>
              <CardHeader
                title="Financial Literacy"
              />
              <CardMedia
                className={classes.media}
                image={FinancialLiteracy}
                title="Financial Literacy"
              />
            </Card>
            <Card className={classes.cell}>
              <CardHeader
                title="PAGIBIG Fund Guide"
              />
              <CardMedia
                className={classes.media}
                image={PagIbigFund}
                title="PAGIBIG Fund Guide"
              />
            </Card>
            <Card className={classes.cell}>
              <CardHeader
                title="Bank Financing Guide"
              />
              <CardMedia
                className={classes.media}
                image={BankFinancing}
                title="Bank Financing Guide"
              />
            </Card>
          </div>
          <div className={classes.tiles}>
            <Card className={classes.cell}>
              <CardHeader
                title="HomeAssist.ph Guide"
              />
              <CardMedia
                className={classes.media}
                image={HomeAssist}
                title="HomeAssist.ph Guide"
              />
            </Card>
            <Card className={classes.cell}>
              <CardHeader
                title="Guide to Choosing a Property"
              />
              <CardMedia
                className={classes.media}
                image={PropertyChoice}
                title="Guide to Choosing a Property"
              />
            </Card>
            <Card className={classes.cell}>
              <CardHeader
                title="Property Sales Process Guide"
              />
              <CardMedia
                className={classes.media}
                image={PropertySales}
                title="Property Sales Process Guide"
              />
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeBuyersGuide;
