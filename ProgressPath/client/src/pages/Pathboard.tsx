import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import FilterBar from '../components/PathBoard/filterbar';
import SearchBar from '../components/PathBoard/searchbar';

const Pathboard = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <h1>Idea Pathway</h1>
      </div>
      <FilterBar />
      <SearchBar />
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <h1>- The Ideas You Loved</h1>
        <p>This is the Saved Inspiration placeholder</p>
      </div>
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <h1>- The Ideas You Loved</h1>
        <p>This is the Saved Inspiration placeholder</p>
      </div>
    </div>
  );
};

export default Pathboard;