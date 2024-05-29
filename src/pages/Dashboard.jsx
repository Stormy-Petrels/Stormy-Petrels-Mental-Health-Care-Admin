import React from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/system";
import CardComponent from "../components/CardComponent";
import { Typography } from "@mui/material";

const DashboardContainer = styled("div")({
  flexGrow: 1,
  padding: 20,
  minHeight: "100vh",
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

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ mt: 3, mb:2 }}>
            Popular doctors
          </Typography>
          <Paper sx={{ mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 200 }}>
                  Name Doctor
                </TableCell>

                <TableCell align="center" style={{ minWidth: 150 }}>
                  Email
                </TableCell>

                <TableCell align="center" style={{ minWidth: 120 }}>
                  Major
                </TableCell>
                <TableCell align="center" style={{ minWidth: 70 }}>
                  Slot
                </TableCell>
                <TableCell align="center" style={{ minWidth: 70 }}>
                  Total money
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
        <Typography variant="h5" sx={{ mt: 3, mb:2 }}>
            Popular majors
          </Typography>
          <Paper sx={{ mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  Name Doctor
                </TableCell>
                <TableCell align="center" style={{ minWidth: 150 }}>
                  Email
                </TableCell>
                <TableCell align="center" style={{ minWidth: 120 }}>
                  Major
                </TableCell>
                </TableRow>
             </TableHead>
             <TableBody></TableBody>
          </Paper>
        
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}
