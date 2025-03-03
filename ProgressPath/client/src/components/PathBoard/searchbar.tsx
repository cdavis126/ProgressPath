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
    <div 
      className="search-bar-container" 
      style={{ 
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        width: "100%", 
      }}
    >
      <Form 
        onSubmit={handleFormSubmit} 
        className="search-form" 
        style={{ 
          width: "70%",
          maxWidth: "800px",
        }}
      >
        <div 
          className="search-input-wrapper" 
          style={{ 
            position: "relative", 
            width: "100%", 
          }}
        >
          <Form.Control
            name="searchInput"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            size="lg"
            placeholder="Search for an idea"
            className="search-input"
            style={{
              width: "100%", 
              padding: "12px 30px",
              borderRadius: "10px", 
              border: "1px solid #ccc",
              fontSize: "1rem",
            }}
          />
          <FaSearch 
            className="search-icon" 
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.2rem",
              color: "#6c5ce7",
              cursor: "pointer",
            }}
          />
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;