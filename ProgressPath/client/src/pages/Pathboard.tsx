import { useState } from "react";
import { useIdeas } from "../context/ideaContext";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import FilterBar from "../components/PathBoard/filterbar";
import Search from "../components/PathBoard/searchbar";
import IdeaCard from "../components/PathBoard/ideacard";
import GoalModal from "../components/DashBoard/GoalModal";

const Pathboard = () => {
  const { categories } = useIdeas();
  console.log("Categories in Modal:", categories);
  const { visibleIdeas, savedIdeas, selectedCategory } = useIdeas();
  const [activeTab, setActiveTab] = useState<"all" | "saved">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openCreateModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Tab Headers
  const tabHeaders = {
    all: { title: "Idea Pathway", description: "Filter or search to discover ideas to help you start your path!" },
    saved: { title: "Paths You Loved", description: "Here are the idea paths you've saved!" },
  };

  // Handle Search
  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };
  const clearSearch = () => {
    setSearchTerm("");
  };

  // Category Filter
  const allIdeas = visibleIdeas.filter(
    (idea) => !savedIdeas.some((savedIdea) => savedIdea._id === idea._id)
  );
  const filteredIdeas = allIdeas.filter(
    (idea) => !selectedCategory || idea.category._id === selectedCategory
  );
  const filteredSavedIdeas = savedIdeas.filter(
    (idea) => !selectedCategory || idea.category._id === selectedCategory
  );

  // Search
  const finalDisplayedIdeas = (activeTab === "saved" ? filteredSavedIdeas : filteredIdeas).filter(
    (idea) =>
      idea.title.toLowerCase().includes(searchTerm) ||
      idea.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div>
      <Header setShowModal={openCreateModal} />
      <Carousel />

      {/* Main Content Wrapper */}
      <div
        className="main-content p-4 rounded shadow"
        style={{
          width: "95%",
          maxWidth: "2000px",
          margin: "20px auto",
          background:
            "linear-gradient(135deg, rgba(214, 246, 221, 0.3) 0%, rgba(218, 196, 247, 0.3) 25%, rgba(244, 152, 156, 0.3) 50%, rgba(235, 210, 180, 0.3) 75%, rgba(172, 236, 247, 0.3) 100%)",
          zIndex: 1,
          padding: 40,
          borderRadius: 10,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Navigation Tabs */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#6c5ce7", marginBottom: "5px", fontWeight: "normal", fontFamily: "inherit" }}>
              {tabHeaders[activeTab].title}
            </h2>
            <p style={{ fontSize: "22px", fontFamily: "inherit", marginTop: 0, marginBottom: 15 }}>
              {tabHeaders[activeTab].description}
            </p>
          </div>
          <div style={{ display: "flex", gap: "15px", background: "transparent" }}>
            {Object.keys(tabHeaders).map((tab) => (
              <span
                key={tab}
                onClick={() => setActiveTab(tab as "all" | "saved")}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                  color: activeTab === tab ? "#6c5ce7" : "#bbb",
                  padding: "8px 16px",
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#6c5ce7")}
                onMouseLeave={(e) => (e.currentTarget.style.color = activeTab === tab ? "#6c5ce7" : "#bbb")}
              >
                {tab === "all" ? "All Ideas" : "Saved Ideas"}

                {/* Underline for active tab */}
                {activeTab === tab && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#6c5ce7",
                    }}
                  ></div>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Filter and Search Bar */}
        <FilterBar />
        <div style={{ marginBottom: "40px" }}>
          <Search onSearch={handleSearch} searchTerm={searchTerm} onClear={clearSearch} />
        </div>

        {/* Empty State Messages - Moved Outside the Grid */}
        {searchTerm && finalDisplayedIdeas.length === 0 ? (
          <p
            style={{
              color: "#f4989c",
              fontSize: "30px",
              textAlign: "center",
              marginTop: "75px",
            }}
          >
            Looks like a blank slate! The perfect moment to set your next big goal.
          </p>
        ) : activeTab === "saved" && savedIdeas.length === 0 ? (
          <p
            style={{
              color: "#f4989c",
              fontSize: "30px",
              textAlign: "center",
              marginTop: "75px",
            }}
          >
            Get Started! Explore ideas, save your favorites, and shape your path!
          </p>
        ) : null}

        {/* Idea List - Now Only Contains Cards */}
        <div
          className="idea-list"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {/* Display Idea Cards */}
          {finalDisplayedIdeas.map((idea) => (
            <IdeaCard key={idea._id} idea={idea} />
          ))}
        </div>

        {/* Goal Modal */}
        {isModalOpen && (
          <GoalModal
            show={isModalOpen}
            handleClose={closeModal}
            categories={categories.map((category) => ({ value: category._id, label: category.name }))}
          />
        )}
      </div>
    </div>
  );
};

export default Pathboard;