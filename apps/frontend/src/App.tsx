import { useState } from 'react';
import { Box, Button, Divider, Grid, Stack, Typography, TextField } from '@mui/material';
import { getEntityById } from './api/api';
import { ApiEntity } from './types';
import EntityTable from './components/EntityTable';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [entityId, setEntityId] = useState(8862);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [entity, setEntity] = useState<ApiEntity>({ name: '', entityId: 0, properties: {} });

  const updateEntityId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntityId(parseInt(event.target.value));
  };

  const getEntityFromServer = async () => {
    const { data, error } = await getEntityById(entityId);
    if (error) {
      setError(true);
      setErrorMessage(error.message);
      console.log(error);
    } else {
      console.log(data);
      if (data) setEntity(data);
    }
  };

  const renderCategories = () => {
    /* If we get an error, show that. If we don't have properties yet (first load, then don't show the table) */
    if (error) {
      return (
        <Typography>{errorMessage}</Typography>
      );
    } else if (Object.keys(entity.properties).length > 0) {
      return (<EntityTable entity={entity} />);
    } else {
      return (
        <Typography>No Properties to Display</Typography>
      );
    }
  };

  return (
    <ErrorBoundary>
      <Box sx={{ margin: '0 auto', padding: 10, textAlign: 'center', maxWidth: '1080px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h3">Entity Viewer</Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider color='white' />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent='center' alignItems='center'>
              <Typography variant="h6">Enter Entity Id: </Typography>
              <TextField label="Entity Id" variant="outlined" color='primary' onChange={updateEntityId} value={String(entityId)} />
              <Button variant='contained' color='primary' onClick={getEntityFromServer}>
                Get Entity
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider color='white' />
          </Grid>

          <Grid item xs={12}>
            {renderCategories()}
          </Grid>
        </Grid>
      </Box>
    </ErrorBoundary>
  );
}

export default App;
