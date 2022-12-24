import { Card, Typography, CardHeader, CardContent, Chip } from "@mui/material";
import { Box, Stack } from '@mui/material';

const Leaderboard = ({ title, subheader, list, ...other }) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {list.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

function Item({ item }) {
  const { image, title, description, proficiency } = item;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 240, flexGrow: 1 }}>
        <Typography
          color="inherit"
          variant="subtitle2"
          underline="hover"
          noWrap
        >
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {description}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0 }}
        
      >
        <Chip label={"Band " + proficiency} color={proficiency < 6.5 ? "warning" : "success"} />
      </Typography>
    </Stack>
  );
}

export default Leaderboard;
