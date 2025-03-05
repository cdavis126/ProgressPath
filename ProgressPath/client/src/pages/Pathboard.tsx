import { useState } from "react";
import { useIdeas } from "../context/ideaContext";
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import FilterBar from '../components/PathBoard/filterbar';
import SearchBar from '../components/PathBoard/searchbar';
import IdeaCard from '../components/PathBoard/ideacard';

const Pathboard = () => {
  const { visibleIdeas = [] } = useIdeas();
  const generalIdeas = visibleIdeas.filter((idea) => !idea.isSaved && !idea.isHidden);
  const savedIdeas = visibleIdeas.filter((idea) => idea.isSaved);
  const hiddenIdeas = visibleIdeas.filter((idea) => idea.isHidden);

  const setShowModal = useState(false)[1];
  const openCreateModal = () => setShowModal(true);

  return (
    <div>
      <Header setShowModal={openCreateModal} />
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
        <div style={{ textAlign: 'left' }}>
          <h3 style={{ marginBottom: '5px', fontWeight: 'normal', fontFamily: 'inherit' }}>
            Idea Pathway
          </h3>
          <p style={{ fontFamily: 'inherit', marginTop: 0 }}>
            Filter or search to discover ideas to help you start your path!
          </p>
        </div>

        {/* Filter Bar Section (Right) */}
        <div style={{ minWidth: '300px' }}>
          <FilterBar />
        </div>
        <SearchBar />

        {/* General Inspo */}
        <div className="idea-list">
          {generalIdeas.length > 0 ? (
            generalIdeas.map((idea) => <IdeaCard key={idea._id} idea={idea} />)
          ) : (
            <p>No ideas available.</p>
          )}
        </div>

        {/* Saved Inspo */}
        {savedIdeas.length > 0 && (
          <div className="saved-ideas">
            <h3>Paths You Loved</h3>
            <p>Here are the ideas you've saved!</p>
            <div className="idea-list">
              {savedIdeas.map((idea) => <IdeaCard key={idea._id} idea={idea} />)}
            </div>
          </div>
        )}

        {/* Hidden Inspo */}
        {hiddenIdeas.length > 0 && (
          <div className="hidden-ideas">
            <h3>Paths Hidden</h3>
            <p>These are the ideas you've chosen to hide.</p>
            <div className="idea-list">
              {hiddenIdeas.map((idea) => <IdeaCard key={idea._id} idea={idea} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pathboard;



