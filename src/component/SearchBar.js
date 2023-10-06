import React , { useState} from 'react'
import { Link } from 'react-router-dom';

const SearchBar = (props) => {
const {setfProgress} = props
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const handleSearch = (e) => {
    const input = e.target.value;
    if (input.trim() === '') {
      setSearchQuery('');
    } else {
      setSearchQuery(e.target.value);
    }

  }

  const handleSubmit = async (e) => {
    setfProgress(30);
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/products/search?query=${searchQuery}`,{
        method:'GET',
        headers:{
            'Content-type':'application/json',
        }
    });
    setfProgress(70)
    const data = await response.json();
    setfProgress(100)
    setResults(data);
  }

  return (
     <form onSubmit={handleSubmit}>
      <input type="text" className='form-control'  value={searchQuery} placeholder="Search Products Here" required onChange={handleSearch} />
      <div className="text-center my-2">
      <button type="submit" className='btn btn-info'>Search</button>
      </div>
      {results.length !==0 && <p>Search Results</p>}
        {results.length !==0 && results.map((result) =>{ 
        
        return <h3 key={result._id}><Link to={`/single/${result._id}`}className='text-dark' key={result._id}>{result.Product_name}</Link></h3>})}
    </form>
  )
}

export default SearchBar
