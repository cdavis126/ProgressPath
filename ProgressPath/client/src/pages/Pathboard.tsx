import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import FilterBar from '../components/PathBoard/filterbar';
import SearchBar from '../components/PathBoard/searchbar';

const Pathboard = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <div style={{ marginTop: '50px', textAlign: 'center', padding: '0 30px' }}>
        <h1 style={{ color: '#f4989c', fontSize: '2.5rem' }}>Idea Pathway</h1>
        <p style={{ fontSize: '1.5rem', color: '#EBD2B4'}}>
          Filter or search to discover your path!
        </p>
      </div>
      <SearchBar />
      <FilterBar />
      <div style={{ marginTop: '50px', textAlign: 'left', padding: '0 30px' }}>
        <h1>Path's You Loved</h1>
        <p>This is the Saved Inspiration placeholder</p>
      </div>
    </div>
  );
};

export default Pathboard;
