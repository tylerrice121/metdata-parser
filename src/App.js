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
import {MdArrowUpward} from 'react-icons/md';

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
    parse.forEach((r, index) => {
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
    togglePropArrow(propToggle)
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
    toggleValArrow(valToggle)
  }

  // toggle arrows

  const toggleValArrow = (valToggle) => {
    const valUp = document.getElementById('valueUp');
    const valDown = document.getElementById('valueDown');
    if (valToggle === true){
      valUp.classList.remove('hide')
      valDown.classList.add('hide')
    } else if (valToggle === false){
      valDown.classList.remove('hide')
      valUp.classList.add('hide')
    }
  }

  const togglePropArrow = (propToggle) => {
    const propUp = document.getElementById('propUp');
    const propDown = document.getElementById('propDown')
    if (propToggle === true) {
      propUp.classList.remove('hide');
      propDown.classList.add('hide');
    } else if (propToggle === false){
      propDown.classList.remove('hide');
      propUp.classList.add('hide');
    }
  }

  return (
    <StyledApp className="App">
      <h1>Metadata Parser</h1>
      {error === true ?
        <>
          <div className="syntaxError" data-alert-container data-testid={'error'}>
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
            rows={18}
            defaultValue="Enter Data Here"
            onChange={handleChange}
          />
          <Button data-testid={'button'} variant="outlined" type="submit">Parse</Button>
        </form>
        <div >
          <TableContainer className='table'>
            <Table aria-label="simple table" className='simpleTable'>
            <caption className="caption">Parsed Data</caption>
              <TableHead className='tableHead'>
                <TableRow className='tableRow'>
                  <TableCell className='title property' style={{ color: '#858688'}} scope='col'>Property</TableCell>
                  <TableCell id='propDown' className='arrows propArrow'  onClick={() => handlePropertyAscending(parse)}><MdArrowDownward/></TableCell>
                  <TableCell id='propUp' className='arrows hide propArrow'  onClick={() => handlePropertyAscending(parse)}><MdArrowUpward/></TableCell>
                  <TableCell className='title value' style={{ color: '#858688'}} onClick={() => handleValueAscending(parse)} scope='col'>Value</TableCell>
                  <TableCell id='valueDown' className='arrows valArrow' onClick={() => handleValueAscending(parse)}><MdArrowDownward/></TableCell>
                  <TableCell id='valueUp' className='arrows hide valArrow' onClick={() => handleValueAscending(parse)}><MdArrowUpward/></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='dataRows'>
                {rows.map((row) => (
                  <TableRow className='dataRow' key={row.id}>
                    <TableCell className='propertyData'>{row.Property}</TableCell>
                    {row.Value.includes('http') ?
                    <TableCell className='valueData'><a href={row.Value}>{row.Value}</a></TableCell>
                    :
                    <TableCell className='valueData'>{row.Value}</TableCell>
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
