import './header.css';
import backgroundImage from "../../assets/PathArrows.jpg";

const Header = () => { 
  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="overlay">
        <div className="header-content">
          <h1>Hi NAME!</h1> {/* Eventually Link to User's Name*/}
          <p>Progress Your Path!</p>
        </div>
      </div>
    </header>
  );
};

export default Header;


