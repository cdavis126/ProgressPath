import { Carousel } from 'react-bootstrap';
import SelfCare from '../../assets/WellBeing/SelfCare.png';
import Fitness from '../../assets/Fitness/Fitness.jpg';
import Mindfulness from '../../assets/Mindset/Mindfulness.png';
import Nutrition from '../../assets/Nutrition/Nutrition.jpg';
import Reading from '../../assets/Growth/Reading.png';
import Creativity from '../../assets/Creativity/Creativity.png';
import Productivity from '../../assets/Productivity/TaskNote.jpg';

export default function App() {
  return (
    <div style={{ display: "block", width: "100%", padding: 0 }}>
      <Carousel fade>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={SelfCare}
            alt="Self Care"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: 'bold', color: 'black' }}>Well-Being</h1>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>"Give yourself the same care and attention that you give to others and watch yourself bloom"</p>
            <p style={{ fontStyle: 'italic', color: 'black' }}>- Unknown</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={Fitness}
            alt="Fitness"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: 'bold', color: 'black' }}>Fitness</h1>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>"Nothing will work unless you do."</p>
            <p style={{ fontStyle: 'italic', color: 'black' }}>- Maya Angelou</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={Mindfulness}
            alt="Mindfulness"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: 'bold', color: 'black' }}>Mindset</h1>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>"What you focus on, is what multiplies."</p>
            <p style={{ fontStyle: 'italic', color: 'black' }}>- Kylie Francis</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={Nutrition}
            alt="Nutrition"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: 'bold', color: 'white' }}>Nutrition</h1>
            <p style={{ fontSize: '1.5rem', color: 'white' }}>"A healthy outside starts from the inside."</p>
            <p style={{ fontStyle: 'italic', color: 'white' }}>- Robert Urich</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={Reading}
            alt="Reading"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: 'bold', color: 'black' }}>Growth</h1>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>"Change is inevitable. Growth is optional."</p>
            <p style={{ fontStyle: 'italic', color: 'black' }}>- John Maxwell</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={Creativity}
            alt="Creativity"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: 'bold', color: 'black' }}>Creativity</h1>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>"Creativity is allowing yourself to make mistakes. Art is knowing which one to keep."</p>
            <p style={{ fontStyle: 'italic', color: 'black' }}>- Scott Adams</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={Productivity}
            alt="Productivity"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1 style={{ fontWeight: 'bold', color: 'black' }}>Productivity</h1>
            <p style={{ fontSize: '1.5rem', color: 'black' }}>"A year from now you'll wish you had started today."</p>
            <p style={{ fontStyle: 'italic', color: 'black' }}>- Karen Lamb</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}


