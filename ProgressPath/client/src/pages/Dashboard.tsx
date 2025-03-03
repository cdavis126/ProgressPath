import { useState } from 'react';
import Header from '../components/Header';
import { AiOutlinePlus } from 'react-icons/ai';
import GoalDisplay from '../components/DashBoard/goaldisplay';
import AddGoalModal from '../components/DashBoard/addgoalmodal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      {/* Header */}
      <Header />

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
        {/* Section: Map Your Path */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h3 style={{ 
            color: '#6c5ce7', 
            fontWeight: 'normal', 
            fontFamily: 'inherit', 
            fontStyle: 'normal',
            marginBottom: '5px' 
          }}>
            Map Your Path
          </h3>
          <p style={{ 
            fontFamily: 'inherit', 
            fontWeight: 'normal', 
            marginTop: 0 
          }}>
            This is the calendar section placeholder
          </p>
        </div>

        {/* Section: Create Your Path (Plus Icon) */}
        <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', textAlign: 'left' }}>
          <h3 style={{ 
            color: '#6c5ce7',
            fontWeight: 'normal', 
            fontFamily: 'inherit', 
            fontStyle: 'normal',
            marginRight: '10px',
            marginBottom: 0,
          }}>
            Create Your Path
          </h3>
          <AiOutlinePlus 
            onClick={handleClick} 
            style={{
              cursor: 'pointer', 
              fontSize: '2rem', 
              color: '#6c5ce7',
              transition: '0.2s ease-in-out',
            }}
            className="plus-icon"
          />
        </div>

        {/* Section: Goal Display */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <GoalDisplay />
        </div>

        {/* Section: Follow Your Path */}
        <div style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h3 style={{ 
            color: '#6c5ce7',
            fontWeight: 'normal', 
            fontFamily: 'inherit', 
            fontStyle: 'normal',
            marginBottom: '5px' 
          }}>
            Follow Your Path
          </h3>
          <p style={{ 
            fontFamily: 'inherit', 
            fontWeight: 'normal', 
            marginTop: 0 
          }}>
            This is the path/goal tracker section placeholder
          </p>
        </div>
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;







