import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/system';
import CardComponent from '../components/CardComponent';

const DashboardContainer = styled('div')({
  flexGrow: 1,
  padding: 20,
  minHeight: '100vh',
});

export default function Dashboard() {
  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="TODAY'S MONEY"
            value="$53,000"
            percentage="+55%"
            since="since"
            iconType="money"
            bgcolor="#009FFD"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="TODAY'S USERS"
            value="2,300"
            percentage="+3%"
            since="since last week"
            iconType="users"
            bgcolor="#FF416C"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="NEW CLIENTS"
            value="+3,462"
            percentage="-2%"
            since="since last quarter"
            iconType="clients"
            bgcolor="#1FAF90"
            isPositive={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="SALES"
            value="$103,430"
            percentage="+5%"
            since="than last month"
            iconType="sales"
            bgcolor="#FF7849"
            isPositive={true}
          />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}
