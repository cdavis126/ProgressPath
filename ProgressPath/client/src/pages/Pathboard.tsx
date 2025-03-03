import Header from '../components/Header';
import Carousel from '../components/Carousel';
import FilterBar from '../components/PathBoard/filterbar';
import SearchBar from '../components/PathBoard/searchbar';
import IdeaCard from '../components/PathBoard/ideacard';

const Pathboard = () => {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Carousel */}
      <Carousel />

      {/* Main Content Wrapper */}
      <div 
        className="main-content p-4 rounded shadow"
        style={{
          width: '95%',
          maxWidth: '2000px',
          margin: '20px auto',
          background: "linear-gradient(135deg, rgba(214, 246, 221, 0.3) 0%, rgba(218, 196, 247, 0.3) 25%, rgba(244, 152, 156, 0.3) 50%, rgba(235, 210, 180, 0.3) 75%, rgba(172, 236, 247, 0.3) 100%)",
          zIndex: 1,
          padding: 40,
          borderRadius: 10,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Idea Pathway + Filter */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '40px' 
        }}>
          {/* Idea Pathway Section (Left) */}
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ marginBottom: '5px', fontWeight: 'normal', fontFamily: 'inherit' }}>
              Idea Pathway
            </h3>
            <p style={{ fontFamily: 'inherit', marginTop: 0 }}>
              Filter or search to discover ideas to help you start your path!
            </p>
          </div>

          {/* Filter Bar Section (Right) */}
          <div style={{ minWidth: '250px' }}>
            <FilterBar />
          </div>
        </div>

        <SearchBar />

        {/* General Inspo */}
        <IdeaCard 
          title="Sample Title" 
          description="Sample Description" 
          categoryName="Sample Category" 
        />

        {/* Saved Inspo */}
        <div style={{ marginTop: '50px', textAlign: 'left', padding: '50px 30px' }}>
          <h3 style={{ color: '#333', marginBottom: '5px', fontWeight: 'normal', fontFamily: 'inherit' }}>
            Paths You Loved
          </h3>
          <p style={{ fontFamily: 'inherit', marginTop: 0 }}>
            This is the Saved Inspiration placeholder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pathboard;


