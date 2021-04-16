import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { showModal } from 'actions/modal';
import { ModalKey } from 'constants/modal';
import Header from 'components/Commons/Header';
import Footer from 'components/Commons/Footer';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
}));

const SubscriptionType = {
  BUNDLE: 'bundle',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

const pricingConfig = {
  [SubscriptionType.BUNDLE]: {
    description: [
      'One-time billing',
    ],
    buttonText: 'Purchase',
    buttonVariant: 'outlined',
  },
  [SubscriptionType.MONTHLY]: {
    description: [
      'Unlimited questions',
      'Renew monthly',
    ],
    buttonText: 'Purchase',
    buttonVariant: 'contained',
  },
  [SubscriptionType.YEARLY]: {
    description: [
      'Unlimited questions',
      'Renew yearly',
    ],
    buttonText: 'Purchase',
    buttonVariant: 'outlined',
  },
};

export default function Pricing() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const packages = useSelector(({ subscription }) => subscription.packages);

  const handlePurchaseClick = (id, price, name, numberOfQuestions) => {
    dispatch(showModal(ModalKey.PAYMENT, {
      selectedPackage: {
        id,
        name,
        numberOfQuestions,
        transactionAmount: price,
      },
    }));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Pricing
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Quickly build an effective pricing table for your potential customers with this layout.
          It&apos;s built with default Material-UI components with little customization.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {packages.map(({
            id, name, price, type, numberOfQuestions,
          }, index) => (
            <Grid item key={id} xs={12} sm={6} md={4}>
              <Card>
                <CardHeader
                  title={name}
                  subheader={index === 1 ? 'Most popular' : ''}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={index === 1 ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      $
                      {price}
                    </Typography>
                  </div>
                  <ul>
                    {type === SubscriptionType.BUNDLE && (
                      <Typography component="li" variant="subtitle1" align="center" key={numberOfQuestions}>
                        For
                        {' '}
                        {numberOfQuestions}
                        {' '}
                        questions
                      </Typography>
                    )}
                    {pricingConfig[type]?.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={pricingConfig[type].buttonVariant}
                    color="primary"
                    onClick={() => handlePurchaseClick(id, price, name, numberOfQuestions)}
                  >
                    {pricingConfig[type].buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
