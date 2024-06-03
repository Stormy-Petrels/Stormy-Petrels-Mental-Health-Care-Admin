import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledCard = styled(Card)(({ bgcolor }) => ({
  minWidth: 275,
  borderRadius: 15,
  textAlign: 'center',
  padding: 20,
  color: '#fff',
  backgroundColor: bgcolor || '#fff',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
}));

const Title = styled(Typography)({
  fontSize: 14,
  color: '#333',
  fontWeight: 'bold',
});

const PositivePercentage = styled('span')({
  color: 'green',
});

const NegativePercentage = styled('span')({
  color: 'red',
});

const IconContainer = styled(Box)(({ bgcolor }) => ({
  backgroundColor: bgcolor,
  borderRadius: '50%',
  padding: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const icons = {
  money: <AccountBalanceWalletIcon sx={{ color: '#fff' }} />,
  users: <PersonIcon sx={{ color: '#fff' }} />,
  clients: <GroupAddIcon sx={{ color: '#fff' }} />,
  sales: <ShoppingCartIcon sx={{ color: '#fff' }} />,
};

export default function CardComponent({ title, value, percentage, since, iconType, bgcolor, isPositive }) {
  const PercentageComponent = isPositive ? PositivePercentage : NegativePercentage;
  const icon = icons[iconType];

  return (
    <StyledCard bgcolor={bgcolor}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Title gutterBottom>
          {title}
        </Title>
        <Typography variant="h5" component="h2">
          {value}
        </Typography>
        <Typography color="textSecondary">
          {since}
        </Typography>
      </CardContent>
      <IconContainer bgcolor={bgcolor}>
        {icon}
      </IconContainer>
    </StyledCard>
  );
}
