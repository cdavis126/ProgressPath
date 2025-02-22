import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './searchbar.css';

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchInput);
    setSearchInput('');
  };

  return (
    <div className="search-bar-container">
      <Form onSubmit={handleFormSubmit} className="search-form">
        <div className="search-input-wrapper">
          <Form.Control
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            size="sm"
            placeholder="Search for an idea"
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;











