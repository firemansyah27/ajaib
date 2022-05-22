import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Search } from '@mui/icons-material'
import {
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';

import { useGetUsersDataMutation } from '../features/apiUsersSlice';

const GenderSelection = ({ style, onChange, value })=> {

  return (
    <Box sx={{ minWidth: 250}} style={style}>
      <FormControl fullWidth>
        <InputLabel id="gender-selection">Gender</InputLabel>
        <Select
          labelId="gender-selection"
          id="gender-select"
          value={value}
          label="Gender"
          onChange={onChange}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

const SearchInput = ({style, results, query, onChange, value})=> {

  const [ getUsersData ] = useGetUsersDataMutation()

  const searchUsersData = async ()=> {
    console.log(query)
    const usersData = await getUsersData(query).unwrap()
    const result = usersData ? usersData.results : []
    results(result)
  }
  
    return (
        <TextField
          style={style}
          sx={{ maxWidth: 250 }}
          id="search-input"
          label="Search"
          value={value}
          onChange={onChange}
          InputProps={{
            endAdornment: (
                <InputAdornment 
                  sx={{
                    padding: "27.5px 14px",
                    backgroundColor: "#1b7ced",
                    marginRight: "-13px",
                    borderTopRightRadius: (theme) =>
                      theme.shape.borderRadius + "px",
                    borderBottomRightRadius: (theme) =>
                      theme.shape.borderRadius + "px"
                  }}
                  position="end"
                >
                <IconButton onClick={searchUsersData}>
                    <Search />
                </IconButton>
                </InputAdornment>
            ),
          }}
        />
    );
  }

  const RowsPerpage = ({ style, value, onChange })=> {
  
    return (
      <Box sx={{ minWidth: 50}} style={style}>
        <FormControl fullWidth>
          <InputLabel id="rows-per-page-selection">Number Per Page</InputLabel>
          <Select
            labelId="rows-per-page-selection"
            id="rows-per-page-select"
            value={value}
            label="rows-per-page"
            onChange={onChange}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }

export {
  SearchInput,
  GenderSelection,
  RowsPerpage
}