import { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { AiOutlinePlus } from 'react-icons/ai';
import GoalDisplay from '../components/DashBoard/goaldisplay';
import AddGoalModal from '../components/DashBoard/addgoalmodal';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <Header />
      <div 
        style={{
          marginTop: '50px', 
          paddingLeft: '30px', 
          paddingTop: '70px',
          paddingBottom: '70px',
          backgroundColor: '#f9f9f9', 
          borderBottom: '3px solid #D6F6DD', 
          borderTop: '3px solid #D6F6DD', 
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '50px',
        }}
        >
        <h1>Map Your Path</h1>
        <p>This is the calendar section placeholder</p>
      </div>

      <div style={{ marginTop: '70px', marginBottom: '70px', paddingLeft: '30px', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ marginRight: '10px', color: '#6c5ce7' }}>Create Your Path</h1>
        <AiOutlinePlus 
          className="bi bi-patch-plus-fill" 
          onClick={handleClick} 
          style={{
            cursor: 'pointer', 
            fontSize: '1.5rem', 
            color: '#6c5ce7'
          }}
        />
      </div>
      <div 
        style={{
          marginTop: '50px', 
          paddingLeft: '30px', 
          paddingBottom: '50px', 
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '90%',
          maxWidth: '2000px',
        }}
      >
        <GoalDisplay />
      </div>
      <div 
        style={{
          marginTop: '50px', 
          paddingLeft: '30px', 
          paddingTop: '70px',
          paddingBottom: '70px',
          backgroundColor: '#f9f9f9', 
          borderBottom: '3px solid #ACECF7', 
          borderTop: '3px solid #ACECF7', 
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
          marginBottom: '15px',
        }}
        >
        <h1>Follow Your Path</h1>
        <p>This is the path/goal tracker section placeholder</p>
      </div>
      <AddGoalModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;
