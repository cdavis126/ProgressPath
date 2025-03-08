import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // ✅ Import Clear (X) Icon

interface SearchIdeasProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;  // ✅ Add searchTerm prop
  onClear: () => void; // ✅ Add onClear function
}

const SearchIdeas = ({ onSearch, searchTerm, onClear }: SearchIdeasProps) => {
  const [searchInput, setSearchInput] = useState(searchTerm); // ✅ Sync with parent state
  const [isFocused, setIsFocused] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearch(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput(""); // ✅ Clear input field
    onClear(); // ✅ Reset search in parent component
  };

  return (
    <div
      style={{
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Form
        onSubmit={handleFormSubmit}
        style={{
          width: "70%",
          maxWidth: "800px",
        }}
      >
        <div
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
            style={{
              width: "100%",
              padding: "12px 30px",
              borderRadius: "10px",
              color: "#6c5ce7",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "2px solid #6c5ce7",
              fontSize: "1.2rem",
              outline: "none",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              boxShadow: isFocused ? "0 0 10px rgba(162, 155, 254, 0.5)" : "none",
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />

          {/* Search Button */}
          <Button
            type="submit"
            style={{
              position: "absolute",
              right: searchInput ? "40px" : "10px", // ✅ Adjust position if clear button exists
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              padding: "5px",
            }}
          >
            <FaSearch
              style={{
                fontSize: "1.2rem",
                color: "#6c5ce7",
                cursor: "pointer",
              }}
            />
          </Button>

          {/* Clear (X) Button - Shows Only When Input is Not Empty */}
          {searchInput && (
            <Button
              onClick={handleClearSearch}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                padding: "5px",
              }}
            >
              <AiOutlineClose
                style={{
                  fontSize: "1.2rem",
                  color: "#ff4757",
                  cursor: "pointer",
                }}
              />
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default SearchIdeas;