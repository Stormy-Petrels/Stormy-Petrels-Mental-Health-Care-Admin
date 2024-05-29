import React from 'react';
import { Card, CardContent, Grid, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const DashboardContainer = styled('div')({
  flexGrow: 1,
  padding: 20,
  backgroundColor: '#00c6ff',
  minHeight: '100vh',
});

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  borderRadius: 15,
  textAlign: 'center',
  padding: 20,
  color: '#fff',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
}));

const Title = styled(Typography)({
  fontSize: 14,
  color: '#000000',
  fontWeight: 'bold',
});

const PositivePercentage = styled('span')({
  color: 'green',
});

const IconContainer = styled(Box)({
  backgroundColor: '#009FFD',
  borderRadius: '50%',
  padding: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function Dashboard() {
  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        
        
      <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Title gutterBottom>
                TODAY'S MONEY
              </Title>
              <Typography variant="h5" component="h2">
                $53,000
              </Typography>
              <Typography color="textSecondary">
                <PositivePercentage>+55%</PositivePercentage> since yesterday
              </Typography>
            </CardContent>
            <IconContainer>
              <AccountBalanceWalletIcon sx={{ color: '#fff' }} />
            </IconContainer>
          </StyledCard>
        </Grid>



        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Title gutterBottom>
                TODAY'S MONEY
              </Title>
              <Typography variant="h5" component="h2">
                $53,000
              </Typography>
              <Typography color="textSecondary">
                <PositivePercentage>+55%</PositivePercentage> since yesterday
              </Typography>
            </CardContent>
            <IconContainer>
              <AccountBalanceWalletIcon sx={{ color: '#fff' }} />
            </IconContainer>
          </StyledCard>
        </Grid>



        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Title gutterBottom>
                TODAY'S MONEY
              </Title>
              <Typography variant="h5" component="h2">
                $53,000
              </Typography>
              <Typography color="textSecondary">
                <PositivePercentage>+55%</PositivePercentage> since yesterday
              </Typography>
            </CardContent>
            <IconContainer>
              <AccountBalanceWalletIcon sx={{ color: '#fff' }} />
            </IconContainer>
          </StyledCard>
        </Grid>


        <Grid item xs={12} sm={6} md={3}>
          <StyledCard>
            <CardContent sx={{ flexGrow: 1 }}>
              <Title gutterBottom>
                TODAY'S MONEY
              </Title>
              <Typography variant="h5" component="h2">
                $53,000
              </Typography>
              <Typography color="textSecondary">
                <PositivePercentage>+55%</PositivePercentage> since yesterday
              </Typography>
            </CardContent>
            <IconContainer>
              <AccountBalanceWalletIcon sx={{ color: '#fff' }} />
            </IconContainer>
          </StyledCard>
        </Grid>
        {/* Add other cards similarly */}
      </Grid>
    </DashboardContainer>
  );
}
