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
import {MdArrowDownward} from 'react-icons/md';

function App() {  

  const [data, setData] = useState(null);
  const [parse, setParse] = useState([]);
  const [error, setError] = useState(null);
  const [propToggle, setPropToggle] = useState(null);
  const [valToggle, setValToggle] = useState(null)

  const handleChange = (event) => {
    setData(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  let arr = [];
  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (data === null){
      return
    } 
    
    try{
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
          let metaValue = meta[i].nextSibling.data;
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

      // if we are unable to read metadata then an error will throw to the user suggesting different syntax
    } catch (error) {
      setParse([]);
      setError(true);
    }
  };
  
  let rows = [];
  
  // create rows based on the parse state established in the handleSubmit function
  const createRows = (parse) => {
    parse.map((r, index) => {
      return rows.push({'id': index + 1, 'Property': r.property, 'Value': r.value})
    })
  }
  
  createRows(parse)
  
  // handle property column sorting
  
  const handlePropertyAscending = (parse) => {
    if (propToggle === null || propToggle === false){
      setPropToggle(true)
    } else {
      setPropToggle(false)
    }

    if (propToggle === true){
      setParse([])
      parse.sort(function(a, b) {
        let propA = a.property.toUpperCase();
        let propB = b.property.toUpperCase();
        if (propA > propB) {
          return -1
        }
        if (propA < propB) {
          return 1
        }
        return 0
      })
      setParse([...parse])
    } else if (propToggle === false || propToggle === null){
      setParse([])
      parse.sort(function(a, b) {
        let propA = a.property.toUpperCase();
        let propB = b.property.toUpperCase();
        if (propA < propB) {
          return -1
        }
        if (propA > propB) {
          return 1
        }
        return 0
      })
      setParse([...parse])
    }
  }
  // handle value column sorting
  
  const handleValueAscending = (parse) => {
    if (valToggle === null || valToggle === false){
      setValToggle(true)
    } else {
      setValToggle(false)
    }

    if (valToggle === true){
      setParse([])
      parse.sort(function(a, b) {
        let valA = a.value.toUpperCase();
        let valB = b.value.toUpperCase();
        if (valA > valB) {
          return -1
        }
        if (valA < valB) {
          return 1
        }
        return 0
      })
      setParse([...parse])
    } else if (valToggle === false || valToggle === null){
      setParse([])
      parse.sort(function(a, b) {
        let valA = a.value.toUpperCase();
        let valB = b.value.toUpperCase();
        if (valA < valB) {
          return -1
        }
        if (valA > valB) {
          return 1
        }
        return 0
      })
      setParse([...parse])
    }
  }


  return (
    <StyledApp className="App">
      <h1>Metadata Parser</h1>
      {error === true ?
        <>
          <div className="syntaxError" data-alert-container>
            <h3 className='errorMessage'>Unable to parse data.  Please enter with valid syntax</h3>
            <a href="http://kb.daisy.org/publishing/docs/metadata/evaluation.html" target='_blank' rel="noreferrer" aria-label="metdata syntax">Click here for examples</a>
          </div>
        </>
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
                  <TableCell style={{ color: '#858688'}}>ID</TableCell>
                  <TableCell className='arrows'><MdArrowDownward/></TableCell>
                  <TableCell style={{ color: '#858688'}} onClick={() => handlePropertyAscending(parse)}>Property</TableCell>
                  <TableCell className='arrows'><MdArrowDownward/></TableCell>
                  <TableCell style={{ color: '#858688'}} onClick={() => handleValueAscending(parse)}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.Property}</TableCell>
                    {row.Value.includes('http') ?
                    <TableCell><a href={row.Value}>{row.Value}</a></TableCell>
                    :
                    <TableCell>{row.Value}</TableCell>
                    }
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
