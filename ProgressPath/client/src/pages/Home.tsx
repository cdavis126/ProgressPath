import Nav from '../components/Navbar/NavLimited';
import { Link } from "react-router-dom";
import "../assets/Styles/Home.css"; 

//  Import images (No Changes)
import Goals1 from "../assets/Styles/Images/Goals1.jpg";
import Goals2 from "../assets/Styles/Images/Goals2.jpg";
import Goals3 from "../assets/Styles/Images/Goals3.jpg";
import Progress1 from "../assets/Styles/Images/Progress1.jpg";
import Progress2 from "../assets/Styles/Images/Progress2.jpg";
import Progress3 from "../assets/Styles/Images/Progress3.jpg";
import Inspiration1 from "../assets/Styles/Images/Inspiration1.jpg";
import Inspiration2 from "../assets/Styles/Images/Inspiration2.jpg";
import Inspiration3 from "../assets/Styles/Images/Inspiration3.jpg";

//  TypeScript-Friendly GIF Import
import SectionBreak2 from "../assets/Styles/Images/SectionBreak2.gif";

const Home = () => {
  return (
    <div>
      <Nav />

      <div className="home-container">
        {/* Block 1 */}
        <section className="home-section">
          <div className="text-content">
            <h1>Track Your Goals</h1>
            <p>Stay on top of your objectives and reach new milestones.</p>
            <Link to="/login" className="btn btn-primary">Find your Goals</Link>
          </div>
          <div className="image-content collage">
            <img src={Goals1} alt="Track your goals" className="top"/>
            <img src={Goals2} alt="Tracking progress" className="left"/>
            <img src={Goals3} alt="Setting milestones" className="right"/>
          </div>
        </section>

        {/*  GIF Break */}
        <div className="section-break">
          <img src={SectionBreak2} alt="Section Transition" className="section-break-gif"/>
        </div>

        {/* Block 2 (Flipped Layout) */}
        <section className="home-section flipped">
          <div className="image-content collage">
            <img src={Progress1} alt="Map your progress" className="top"/>
            <img src={Progress2} alt="Tracking development" className="left"/>
            <img src={Progress3} alt="Achieving goals" className="right"/>
          </div>
          <div className="text-content">
            <h1>Map Your Progress</h1>
            <p>Visualize your journey and celebrate every achievement.</p>
            <Link to="/login" className="btn btn-primary">Track your Progress</Link>
          </div>
        </section>

        {/* Another GIF Break */}
        <div className="section-break">
          <img src={SectionBreak2} alt="Section Transition" className="section-break-gif"/>
        </div>

        {/* Block 3 (Fixed Last Section) */}
        <section className="home-section">
          <div className="text-content">
            <h1>Get Inspiration for Your Path</h1>
            <p>Find motivation and stay inspired on your journey.</p>
            <Link to="/login" className="btn btn-primary">Get Inspired</Link>
          </div>
          <div className="image-content collage">
            <img src={Inspiration1} alt="Get inspired" className="top"/>
            <img src={Inspiration2} alt="Motivational journey" className="left"/>
            <img src={Inspiration3} alt="Path to success" className="right move-left"/>
          </div>
        </section>

        {/* Additional Section Break Before Footer */}
        <div className="section-break-footer">
          <img src={SectionBreak2} alt="Section Transition" className="section-break-gif"/>
        </div>

      </div>

      {/*  Footer */}
      <footer className="custom-footer">
        <p>ProgressPath ©</p>
      </footer>
    </div>
  );
};

export default Home;


