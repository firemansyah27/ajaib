import logo from './logo.svg';
import './App.css';
import { 
  TablePagination, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableFooter, 
  TableRow, 
  Paper, 
  TableSortLabel,
  Button,
  Pagination
} from '@mui/material';
import { 
  makeStyles
} from '@mui/styles';
import { useState, useEffect } from 'react';
import { SearchInput, GenderSelection, RowsPerpage } from './components/input';
import { useGetUsersDataMutation } from './features/apiUsersSlice';



const defaultQueryParams = `results=${5}`
const  App = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [keyword, setKeyword] = useState("")
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [orderDirection, setorderDirection] = useState("desc")
  const [valueToOrderBy, setvalueToOrderBy] = useState("")
  const [gender, setGender] = useState("all")
  const [query, setQuery] = useState(defaultQueryParams)
  const classes = useStyles();

  const [ getUsersData ] = useGetUsersDataMutation()

  useEffect(() => {
    async function initiateDate() {
      console.log(query)
      await searchUsersData()
    } 
    initiateDate()
  }, [rowsPerPage, page, orderDirection, gender])

  const searchUsersData = async ()=> {
    const usersData = await getUsersData(query).unwrap()
    const result = usersData ? usersData.results : []
    setData(result)
  }
  
  const buildQueryParams = (data, action)=> {
    let params = new URLSearchParams(query);
    
    switch(action) {
      case 'add':
        data.forEach(element => {
          params.append(element.key, element.value)
        }); 
        break;
      case 'remove':
        data.forEach(element => {
          params.delete(element.key)
        }); 
        break;
      case 'update':
        data.forEach(element => {
          params.set(element.key, element.value)
        }); 
        break;
      default:
        break;

    }
    let queryParams = params.toString()
    setQuery(queryParams)
  }

  const handleSearchOnchange = (e)=> {
    if (e.target.value === "") {
      buildQueryParams([{key: "keyword", value: e.target.value}], "remove")
    } else {
      buildQueryParams([{key: "keyword", value: e.target.value}], "update")
    }
    setKeyword(e.target.value)
  }


  const handleGenderOnchange = (e)=> {
    if (e.target.value === "all") {
      buildQueryParams([{key: "gender", value: e.target.value}], "remove")
    } else {
      buildQueryParams([{key: "gender", value: e.target.value}], "add")
    }
    setGender(e.target.value)
  }
  
  const handleRowsPerpageOnchange = (e)=> {
    setRowsPerPage(e.target.value)
    buildQueryParams([{key: "results", value: e.target.value}], "update")
  }
  
  const handlePaginationOnchange = (e, v)=> {
    setPage(v)
    buildQueryParams([{key: "page", value: v}], "update")
  }
  
  const createSortHandle = async (v)=> {
    let direction = orderDirection === 'asc' ? 'desc' : 'asc'
    if ( valueToOrderBy && valueToOrderBy != v ) {
      direction = "asc"
    }
    buildQueryParams([{key: "sortBy", value: v}, {key: "sortOrder", value: direction}], "update")
    setvalueToOrderBy(v)
    setorderDirection(direction)
  }

  const handleResetFilter = ()=> {
    setPage(1)
    setRowsPerPage(5)
    setorderDirection("desc")
    setvalueToOrderBy("")
    setGender("all")
    setQuery(defaultQueryParams)
    setKeyword("")
  }

  return (
    <div
      className={classes.main}
    >
      <div
        style= {{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          margin: 'auto'
        }}
      >
          <SearchInput 
            style={{ marginRight: "10px" }} 
            query={query} 
            results={(data)=> setData(data)}
            onChange={(e)=> handleSearchOnchange(e)}
            value={keyword}
          />
          <GenderSelection style={{ marginRight: "10px" }} value={gender} onChange={(e) => handleGenderOnchange(e)}/>
          <Button variant="outlined" color="inherit" onClick={(e)=> handleResetFilter()}>Reset Filter</Button>
      </div>
      <div
        style={{
          marginTop: '50px',
        }}
      >
        <RowsPerpage style={{ marginLeft: "auto", width: "130px" }} value={rowsPerPage} onChange={(e) => handleRowsPerpageOnchange(e)}/>
        <div
          style={{
            borderRight: '0.3px solid lightgray',
            borderLeft: '0.3px solid lightgray',
          }}
        >
          <TableContainer component={Paper}>
            <Table className={"table"} aria-label="information table">
              <TableHead>
                <TableRow>
                  <TableCell align = "left" key = "username">
                    <TableSortLabel
                        active={valueToOrderBy === "username"}
                        direction={valueToOrderBy === "username" ? orderDirection: 'asc'}
                        onClick={(e)=> createSortHandle("username")}
                    >
                        Username
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align = "left" key = "name">
                    <TableSortLabel
                        active={valueToOrderBy === "name"}
                        direction={valueToOrderBy === "name" ? orderDirection: 'asc'}
                        onClick={(e)=> createSortHandle("name")}
                    >
                        Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align = "left" key = "email">
                    <TableSortLabel
                        active={valueToOrderBy === "email"}
                        direction={valueToOrderBy === "email" ? orderDirection: 'asc'}
                        onClick={(e)=> createSortHandle("email")}
                    >
                        Email
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align = "left" key = "gender">
                    <TableSortLabel
                        active={valueToOrderBy === "gender"}
                        direction={valueToOrderBy === "gender" ? orderDirection: 'asc'}
                        onClick={(e)=> createSortHandle("gender")}
                    >
                        Gender
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align = "left" key = "registered">
                    <TableSortLabel
                        active={valueToOrderBy === "registered"}
                        direction={valueToOrderBy === "registered" ? orderDirection: 'asc'}
                        onClick={(e)=> createSortHandle("registered")}
                    >
                        Registered Date
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data
                  .map((row, index1) => (
                    <TableRow key={index1}>
                                    <TableCell>
                                      {row?.login?.username}
                                    </TableCell>
                                    <TableCell>
                                      {row?.name?.first} {row?.name?.last}
                                    </TableCell>
                                    <TableCell>
                                      {row?.email}
                                    </TableCell>
                                    <TableCell>
                                      {row?.gender}
                                    </TableCell>
                                    <TableCell>
                                      {row?.registered?.date}
                                    </TableCell>
                                </TableRow>
                            ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {data.length > 0?
      <Pagination 
        style={{ marginTop: "10px", display: "flex", justifyContent: "flex-end" }} 
        count={Math.ceil(10 / rowsPerPage)} 
        variant="outlined" 
        shape="rounded" 
        onChange={handlePaginationOnchange}
      />
      :
      <></>}
    </div>
  );
}

const useStyles = makeStyles({
  main: {
    width: 'auto',
    marginRight: '25vh',
    marginBottom: '25px',
    marginLeft: '25px',
    marginTop: '50px',
    borderRadius: '8px',
  },
});

export default App;
