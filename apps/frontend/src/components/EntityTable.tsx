import React from 'react';
import { ApiEntity, PropertyValues } from '../types';
import { Box, Collapse, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface EntityPropertiesRowProps {
  propertyValues: PropertyValues;
  open: boolean;
}

const EntityPropertiesRow: React.FC<EntityPropertiesRowProps> = ({ propertyValues, open }) => {
  return (
    <TableRow key={crypto.randomUUID()}>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2} key={crypto.randomUUID()}>
        <Collapse in={open} timeout="auto" unmountOnExit key={crypto.randomUUID()}>
          <Box sx={{ margin: 1 }} key={crypto.randomUUID()}>
            <Table size="small" key={crypto.randomUUID()}>
              <TableHead key={crypto.randomUUID()}>
                <TableRow key={crypto.randomUUID()}>
                  <TableCell width={200} key={crypto.randomUUID()}>Property</TableCell>
                  <TableCell width={300} key={crypto.randomUUID()}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody key={crypto.randomUUID()}>
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


interface EntityCategoryRowProps {
  category: [string, PropertyValues];
  open: boolean;
  setOpen: (category: string, open: boolean) => void;
}

const EntityCategoryRow: React.FC<EntityCategoryRowProps> = ({ category, open, setOpen }) => {

  return (
    <React.Fragment key={crypto.randomUUID()}>
      <TableRow key={crypto.randomUUID()}>
        <TableCell key={crypto.randomUUID()}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(category[0], !open)}
            key={crypto.randomUUID()}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" key={crypto.randomUUID()}>
          <Typography variant='h6' key={crypto.randomUUID()}>{category[0]}</Typography>
        </TableCell>
      </TableRow>
      <EntityPropertiesRow propertyValues={category[1]} open={open} />
    </React.Fragment>
  );
};

interface CategoryOpen {
  [key: string]: boolean;
}

interface EntityTableProps {
  entity: ApiEntity;
}

const EntityTable: React.FC<EntityTableProps> = ({ entity }) => {

  const [categoryOpen, setCategoryOpen] = React.useState<CategoryOpen>({});

  const categories = Object.entries(entity.properties);

  React.useEffect(() => {
    const newCategoryOpen: CategoryOpen = {};
    categories.forEach((key) => {
      newCategoryOpen[key[0]] = false;
    });
    setCategoryOpen(newCategoryOpen);

    // had to do this to ensure this only gets run on monunt
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setThisCategoryOpen = (category: string, open: boolean) => {
    setCategoryOpen((prevCategoryOpen) => {
      return { ...prevCategoryOpen, [category]: open };
    });
  };

  const renderCategories = () => {
    return categories.map(([category, propertyValues]) => {
      return (
        EntityCategoryRow({ category: [category, propertyValues], open: categoryOpen[category], setOpen: setThisCategoryOpen })
      );
    });
  };

  return (
    <Box>
      <Stack key={crypto.randomUUID()} spacing={2} direction="column" justifyContent='center' alignItems='center'>
        <Stack key={crypto.randomUUID()} spacing={2} direction="row" justifyContent='center' alignItems='center'>
          <Typography variant="h4">Name: {entity.name}</Typography>
          <Typography variant="h6">Id: {entity.entityId}</Typography>
        </Stack>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow key={crypto.randomUUID()}>
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
