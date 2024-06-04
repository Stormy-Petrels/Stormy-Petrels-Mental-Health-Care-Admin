import React, { useEffect, useState } from "react";
import {
  Avatar,
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
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const DashboardContainer = styled("div")({
  flexGrow: 1,
  padding: 20,
  minHeight: "100vh",
});

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: "",
    totalDoctors: "",
    totalPatients: "",
    totalRevenue: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [majors, setMajors] = useState([]);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/admin/stats");
        const data = await response.json();
        if (data.status === 200) {
          setStats({
            totalUsers: data.data.totalUsers,
            totalDoctors: data.data.totalDoctors,
            totalPatients: data.data.totalPatients,
            totalRevenue: data.data.totalRevenue,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/stats/doctors"
        );
        const data = await response.json();
        if (data.status === 200) {
          setDoctors(data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const baseURL = "http://127.0.0.1:8000/images/";

  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/admin/stats/majors"
        );
        const data = await response.json();
        if (data.status === 200) {
          setMajors(data.data);
          setChartData({
            labels: data.data.map((major) => major.majorName),
            datasets: [
              {
                data: data.data.map((major) => major.totalDoctors),
                backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56",
                  "#4BC0C0",
                  "#9966FF",
                  "#FF9F40",
                ],
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };

    fetchMajors();
  }, []);

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="TOTAL USERS"
            value={stats.totalUsers}
            iconType="money"
            bgcolor="#009FFD"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="TOTAL PATIENTS"
            value={stats.totalPatients}
            iconType="users"
            bgcolor="#FF416C"
            isPositive={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="TOTAL DOCTORS"
            value={stats.totalDoctors}
            iconType="clients"
            bgcolor="#1FAF90"
            isPositive={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardComponent
            title="TOTAL REVENUE"
            value={stats.totalRevenue + " VND"}
            iconType="sales"
            bgcolor="#FF7849"
            isPositive={true}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Popular doctors
          </Typography>
          <Paper sx={{ mb: 3 }}>
            <Table>
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
              <TableBody>
                {doctors.length > 0 ? (
                  doctors.map((doctor, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Avatar
                          alt={doctor.doctorName}
                          src={`${baseURL}${doctor.avatar}`}
                        />
                        <Typography>{doctor.doctorName}</Typography>
                      </TableCell>
                      <TableCell align="center">{doctor.doctorEmail}</TableCell>
                      <TableCell align="center">{doctor.doctorMajor}</TableCell>
                      <TableCell align="center">{doctor.totalSlots}</TableCell>
                      <TableCell align="center">
                        {doctor.totalEarnings ? doctor.totalEarnings : "0.00"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
            Popular majors
          </Typography>
          <Paper sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ minWidth: 120 }}>
                    Major
                  </TableCell>
                  <TableCell align="center" style={{ minWidth: 150 }}>
                    Total Doctors
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {majors.length > 0 ? (
                  majors.map((major, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{major.majorName}</TableCell>
                      <TableCell align="center">{major.totalDoctors}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {chartData && chartData.labels && chartData.labels.length > 0 && (
              <div style={{ width: "70%", margin: "0 auto", padding: "20px" }}>
                <Pie data={chartData} />
              </div>
            )}
          </Paper>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
}
