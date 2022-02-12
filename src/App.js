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
    let link = el.getElementsByTagName('link')
    let meta = el.getElementsByTagName('meta')

    for (let i = 0; i < meta.length; i++) {
      let metaValue = meta[i].nextSibling.data.replace(/\n.*/g, '')

      arr.push({'property': meta[i].attributes[0].value, 'value': metaValue})
      arr.push({'property': link[i].attributes.rel.value, 'value': link[i].href})

      setParse([...arr])  
    }
  }
  
  console.log(parse, 'this is parse')

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
          <li>{parse[0].property}: {parse[0].value}</li>
          <li>{parse[1].property}: {parse[1].value}</li>
          <li>{parse[2].property}: {parse[2].value}</li>
          <li>{parse[3].property}: {parse[3].value}</li>
        </ul>

        :
        
        <h1>Copy some data to parse</h1>
      }
    </div>
  );
}

export default App;
