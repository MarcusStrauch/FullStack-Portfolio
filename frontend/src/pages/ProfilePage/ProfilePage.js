import {
  Avatar,
  Box,
  Container,
  Divider,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";

export const ProfilePage = ({ user }) => {
  return (
    <Container component={Paper} sx={{ px: 3, py: 2 }} maxWidth="sm">
      {user.userName ? (
        <Box sx={{display: "flex", alignItems: "center", pb: 1}}>
          <Avatar src={user.profileImg} sx={{mr: 2}} />
          <Typography component="h2" variant="h6">
            {user.userName}
          </Typography>
        </Box>
      ) : (
        <Skeleton />
      )}
      <Divider sx={{mb: 2}} />
      {user.firstName && <Typography>Vorname: {user.firstName}</Typography>}
      {user.lastName && <Typography>Nachname: {user.lastName}</Typography>}
    </Container>
  );
};
