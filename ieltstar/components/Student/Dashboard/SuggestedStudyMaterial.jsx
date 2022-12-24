// @mui
import PropTypes from 'prop-types';
import { Box, Card, Paper, Typography, CardHeader, CardContent } from '@mui/material';
// utils

// ----------------------------------------------------------------------

SuggestedStudyMaterial.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function SuggestedStudyMaterial({ title, subheader, list, ...other }) {
  return (
    <Card {...other} style={{height: '100%'}}>
      <CardHeader title={title} subheader={subheader} />

      <CardContent >
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
          }}
        >
          {list.map((site) => (
            <Paper key={site.name} variant="outlined" sx={{ py: 2.5, textAlign: 'center', cursor: 'pointer' }}>
              <Box sx={{ mb: 0.5 }}>{site.icon}</Box>

              <Typography variant="h6">{site.value}</Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {site.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
