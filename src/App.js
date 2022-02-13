import './App.css';
import { StyledApp } from './styles';
import {useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {  

  const [data, setData] = useState(null);
  const [parse, setParse] = useState([])

  const handleChange = (event) => {
    setData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  let arr = [];
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let el = document.createElement('html')
    el.innerHTML = data.data
    let meta;
    let link;

    if (data.data.includes('property')){
      link = el.getElementsByTagName('link')
      meta = el.getElementsByTagName('meta')
      for (let i = 0, j = 0; i < meta.length, j < link.length; i++, j++) {
        let metaValue = meta[i].nextSibling.data.replace(/\n.*/g, '')
        
        arr.push({'property': meta[i].attributes[0].value, 'value': metaValue})
        arr.push({'property': link[j].attributes.rel.value, 'value': link[j].href})
        
        setParse([...arr])
        
      }
    } else if (data.data.includes('content')) {
      meta = el.getElementsByTagName('meta')
      for (let i = 0; i < meta.length; i++) {
        
        arr.push({'property': meta[i].attributes[0].value, 'value': meta[i].attributes[1].value})
  
        setParse([...arr])  
      }

    } else {

      setParse([])

    }
  }

  // create MUI table

  let rows = [];

  const createRows = (parse) => {
    parse.map((r, index) => {
      rows.push({'id': index + 1, 'Property': r.property, 'Value': r.value})
    })
  }

  createRows(parse)

  return (
    <StyledApp className="App">
      <h1>Metadata Parser</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-multiline-static"
            label="Data"
            name='data'
            multiline
            rows={15}
            defaultValue="Enter Data Here"
            onChange={handleChange}
          />
          <Button variant="outlined" type="submit">Parse</Button>
        </form>
        <div >
          <TableContainer className='table'>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Property</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.Property}</TableCell>
                    <TableCell>{row.Value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </StyledApp>
  );
}

export default App;
