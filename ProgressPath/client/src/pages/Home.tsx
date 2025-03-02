import Nav from '../components/Navbar/NavLimited';
import { Link } from "react-router-dom";
import "/src/styles/Home.css";

const Home = () => {
  return (
    <div>
      <Nav />

      <div className="home-container">
        {/* Blcock 1 */}
        <section className="home-section left">
          <div className="text-content">
            <h1>Track Your Goals</h1>
            <p>Stay on top of your objectives and reach new milestones.</p>
            <Link to="/login" className="btn btn-primary">Find your Goals</Link>
          </div>
          <div className="image-content">
            <img src="/images/Goals1.jpg" alt="Track your goals" />
            <img src="/images/Goals2.jpg" alt="Tracking progress" />
            <img src="/images/Goals3.jpg" alt="Setting milestones" />
          </div>
        </section>

        {/* Block 2 */}
        <section className="home-section right">
          <div className="image-content">
            <img src="/images/Progress1.jpg" alt="Map your progress" />
            <img src="/images/Progress2.jpg" alt="Tracking development" />
            <img src="/images/Progress3.jpg" alt="Achieving goals" />
          </div>
          <div className="text-content">
            <h1>Map Your Progress</h1>
            <p>Visualize your journey and celebrate every achievement.</p>
            <Link to="/login" className="btn btn-primary">Track your Progress</Link>
          </div>
        </section>

        {/* Last Block  c*/}
        <section className="home-section left">
          <div className="text-content">
            <h1>Get Inspiration for Your Path</h1>
            <p>Find motivation and stay inspired on your journey.</p>
            <Link to="/login" className="btn btn-primary">Get Inspired</Link>
          </div>
          <div className="image-content">
            <img src="/images/inspiration1.jpg" alt="Get inspired" />
            <img src="/images/inspiration2.jpg" alt="Motivational journey" />
            <img src="/images/inspiration3.jpg" alt="Path to success" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;


