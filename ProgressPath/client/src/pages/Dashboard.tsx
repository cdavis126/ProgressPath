import { useState } from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { AiOutlinePlus } from 'react-icons/ai';
import GoalDisplay from '../components/PathBoard/goaldisplay';
import AddGoalModal from '../components/PathBoard/addgoalmodal';

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
      <div style={{ marginTop: '50px', paddingLeft: '30px', display: 'flex', alignItems: 'center' }}>
        <h1 style={{ marginRight: '10px' }}>Create Your Path</h1>
        <AiOutlinePlus 
          onClick={handleClick} 
          style={{
            cursor: 'pointer', 
            fontSize: '1.5rem', 
            color: '#6c5ce7'
          }} 
        />
      </div>
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <GoalDisplay />
      </div>
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <h1>Follow Your Path</h1>
        <p>This is the path/goal tracker section placeholder</p>
      </div>
      <AddGoalModal isOpen={isModalOpen} onRequestClose={handleCloseModal} />
    </div>
  );
};

export default Dashboard;
