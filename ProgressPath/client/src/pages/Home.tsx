import Nav from "../components/Navbar/NavLimited";
import { Link } from "react-router-dom";
import "../assets/Styles/Home.css";

// Importing optimized images
import Goals1 from "../assets/Styles/Images/Goals1.jpg";
import Goals2 from "../assets/Styles/Images/Goals2.jpg";
import Exercise from "../assets/Styles/Images/Exercise.png";
import Knowledge from "../assets/Styles/Images/Knowledge.png";
import Inspiration3 from "../assets/Styles/Images/Inspiration3.jpg";
import Creativity from "../assets/Styles/Images/Creativity.png";
import SectionBreak2 from "../assets/Styles/Images/SectionBreak2.gif";

const Home = () => {
  return (
    <div>
      <Nav />

      <div className="home-container">
        {/* Section 1 */}
        <section className="home-section">
          <div className="text-content">
            <h1 className="section-title gradient-text">Track Your Goals</h1>
            <p>Stay on top of your objectives and reach new milestones.</p>
            <Link to="/login" className="btn btn-primary">Find Your Goals</Link>
          </div>
          <div className="image-content stacked">
            <img src={Goals1} alt="Goals planner" />
            <img src={Goals2} alt="Group celebrating goals" />
          </div>
        </section>

        {/* GIF Divider */}
        <div className="section-break">
          <img src={SectionBreak2} alt="Section Transition" className="section-break-gif"/>
        </div>

        {/* ✅ Section 2 (Fixed: Images Stacked) */}
        <section className="home-section flipped">
          <div className="text-content">
            <h1 className="section-title gradient-text">Map Your Progress</h1>
            <p>Visualize your journey and celebrate every achievement.</p>
            <Link to="/login" className="btn btn-primary">Track Your Progress</Link>
          </div>
          <div className="image-content stacked">
            <img src={Exercise} alt="Fitness progress" />
            <img src={Knowledge} alt="Brainstorm ideas" />
          </div>
        </section>

        {/* GIF Divider */}
        <div className="section-break">
          <img src={SectionBreak2} alt="Section Transition" className="section-break-gif"/>
        </div>

        {/* Section 3 (Fixed: Images Stacked) */}
        <section className="home-section">
          <div className="text-content">
            <h1 className="section-title gradient-text">Get Inspired</h1>
            <p>Find motivation and stay inspired on your journey.</p>
            <Link to="/login" className="btn btn-primary">Get Inspired</Link>
          </div>
          <div className="image-content stacked">
            <img src={Creativity} alt="Creativity and inspiration" />
            <img src={Inspiration3} alt="Vision board" />
          </div>
        </section>

        {/* GIF Divider (Centered Before Footer) */}
        <div className="section-break-footer">
          <img src={SectionBreak2} alt="Section Transition" className="section-break-gif centered-arrow"/>
        </div>
      </div>

      {/* Footer */}
      <footer className="custom-footer">
        <p>ProgressPath ©</p>
      </footer>
    </div>
  );
};

export default Home;





