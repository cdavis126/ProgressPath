import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import FilterBar from '../components/PathBoard/filterbar';
import SearchBar from '../components/PathBoard/searchbar';
import IdeaCard from '../components/PathBoard/ideacard';

const Pathboard = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <div style={{ marginTop: '50px', textAlign: 'center', padding: '0 30px' }}>
        <h1 style={{ color: '#f4989c', fontSize: '2.5rem' }}>Idea Pathway</h1>
        <p style={{ fontSize: '1.5rem', color: '#EBD2B4'}}>
          Filter or search to discover ideas to help you start your path!
        </p>
      </div>
      <SearchBar />
      <FilterBar />
      <IdeaCard />
      <div style={{ marginTop: '50px', textAlign: 'left', padding: '50px 30px', backgroundColor: '#D6F6DD', color: '#333' }}>
        <h1 style={{ fontSize: '2rem', color: '#333' }}>Path's You Loved</h1>
        <p style={{ fontSize: '1.2rem' }}>This is the Saved Inspiration placeholder</p>
      </div>
    </div>
  );
};

export default Pathboard;
