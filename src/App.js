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
  const [parse, setParse] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const invalidSyntax = () => {
    const message = document.getElementsByClassName('syntaxError');
    // message.style.color = 'blue';
    console.log(message)
  }

  let arr = [];
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (data === null){
      return
    } 
    
    let el = document.createElement('html');
    el.innerHTML = data.data;
    let meta;
    let link;

    // condition for EPUB 3 Accessibility specification

    if (data.data.includes('property')){
      link = el.getElementsByTagName('link');
      meta = el.getElementsByTagName('meta');

      // push each meta tag to the array

      for (let i = 0; i < meta.length; i++) {
        let metaValue = meta[i].nextSibling.data.replace(/\n.*/g, '')    
        arr.push({'property': meta[i].attributes[0].value, 'value': metaValue})    
      };
      // push the link tags to the array

      for (let i = 0; i < link.length; i++) {
        arr.push({'property': link[i].attributes.rel.value, 'value': link[i].href})
      };
      // set the Parse state 

      setParse([...arr]);
      setError(false)

    // condition for EPUB 2 Accessibility specification

    } else if (data.data.includes('content')) {
      meta = el.getElementsByTagName('meta');

      // push all meta tags to array and set the Parse state 
      for (let i = 0; i < meta.length; i++) {
        arr.push({'property': meta[i].attributes[0].value, 'value': meta[i].attributes[1].value});
        setParse([...arr]);  
        setError(false);
      };

    } else {

      // if neither EPUB 2 or EPUB 3 conditions are met - set Parse state to empty array
      setParse([]);
      setError(true);
    };
  };




  // create rows based on the parse state established in the handleSubmit function

  let rows = [];
  
  const createRows = (parse) => {
    parse.map((r, index) => {
       return rows.push({'id': index + 1, 'Property': r.property, 'Value': r.value})
    })
  }

  createRows(parse)

  return (
    <StyledApp className="App">
      <h1>Metadata Parser</h1>
      {error === true ?
        <h3 style={{ color: 'red' }}className="syntaxError">Unable to parse data.  Please enter with valid syntax</h3>
        : 
        null
      }
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <TextField
            className='text'
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
