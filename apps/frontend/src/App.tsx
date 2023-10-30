import { useState } from 'react';
import { Button, Grid, Stack, Typography } from '@mui/material';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h1">Resolve App</Typography>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={2} direction="column">
            <Typography variant="h2">Counter</Typography>
            <Button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
