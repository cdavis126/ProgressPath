import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { AiOutlinePlus } from 'react-icons/ai';

const Dashboard = () => {
  const handleClick = () => {
    console.log("Clicked the + icon!");
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
        <h1>Follow Your Path</h1>
        <p>This is the path/goal tracker section placeholder</p>
      </div>
    </div>
  );
};

export default Dashboard;
