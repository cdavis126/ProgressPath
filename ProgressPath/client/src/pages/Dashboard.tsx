import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
	    <Header />
      <div style={{ marginTop: '50px', paddingLeft: '30px' }}>
        <h1>Goal Section</h1>
        <p>This is the goal section placeholder</p>
      </div>
    </div>
  );
};

export default Dashboard;

