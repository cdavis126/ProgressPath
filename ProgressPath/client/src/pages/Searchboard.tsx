import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import SearchCollection from '../components/Collection/SearchCollection';

const Searchboard = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <h1>- Idea Collection</h1>
        <p>This is the Inspiration placeholder</p>
      </div>
      <SearchCollection/>
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <h1>- The Ideas You Loved</h1>
        <p>This is the Saved Inspiration placeholder</p>
      </div>
    </div>
  );
};

export default Searchboard;