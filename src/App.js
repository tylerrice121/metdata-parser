import './App.css';
import {useState} from 'react'
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


  return (
    <div className="App">
      <h1>Metadata Parser</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          name="data" id="data" 
          cols="30" 
          rows="10"
          onChange={handleChange}>
        </textarea>
        <input type="submit" name="" value="parse" />
      </form>
      {parse.length ?
        
        <ul>
          {parse.map((p, index) =>
          
            <li key={index}>{p.property}: {p.value}</li>

          )}
        </ul>

        :

        <h1>Copy some data to parse</h1>
        
      }
    </div>
  );
}

export default App;
