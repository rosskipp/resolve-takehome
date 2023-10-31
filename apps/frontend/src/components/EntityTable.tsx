import React from 'react';
import { ApiEntity, PropertyValues } from '../types';
import { Box, Collapse, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface EntityTableProps {
  entity: ApiEntity;
}

const EntityPropertiesRow: React.FC<{ propertyValues: PropertyValues, open: boolean; }> = ({ propertyValues, open }) => {
  return (
    <TableRow key={crypto.randomUUID()}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Properties
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow key={crypto.randomUUID()}>
                  <TableCell width={200}>Property</TableCell>
                  <TableCell width={300}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(propertyValues).map((key) => (
                  <TableRow key={crypto.randomUUID()}>
                    <TableCell component="th" scope="row">{key}</TableCell>
                    <TableCell>{propertyValues[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};


const EntityCategoryRow: React.FC<{ category: [string, PropertyValues]; }> = ({ category }) => {

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow key={crypto.randomUUID()}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant='h6'>{category[0]}</Typography>
        </TableCell>
      </TableRow>
      <EntityPropertiesRow propertyValues={category[1]} open={open} />
    </React.Fragment>
  );
};

const EntityTable: React.FC<EntityTableProps> = ({ entity }) => {

  const categories = Object.entries(entity.properties);

  const renderCategories = () => {
    return categories.map(([category, propertyValues]) => {
      return (
        EntityCategoryRow({ category: [category, propertyValues] })
      );
    });
  };


  return (
    <Box>
      <Stack spacing={2} direction="column" justifyContent='center' alignItems='center'>
        <Stack spacing={2} direction="row" justifyContent='center' alignItems='center'>
          <Typography variant="h4">{entity.name}</Typography>
          {/* <Typography variant="h6">Entity Id: {entity.entityId}</Typography> */}
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography variant='h5'><b>Category</b></Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {renderCategories()}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
};

export default EntityTable;
