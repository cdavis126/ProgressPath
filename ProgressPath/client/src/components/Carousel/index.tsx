import { Carousel } from 'react-bootstrap';
import SelfCare from '../../assets/SelfCare.png';
import Fitness from '../../assets/Fitness.jpg';
import Mindfulness from '../../assets/Mindfulness.png';
import Nutrition from '../../assets/Nutrition.jpg';
import Reading from '../../assets/Reading.png';
import Sleep from '../../assets/Sleep.png';
import Creativity from '../../assets/Creativity.png';


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
            <h1>Self Care</h1>
            <p>Sample Text for Image One</p>
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
            <h1>Fitness</h1>
            <p>Sample Text for Image Two</p>
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
            <h1>Mindfulness</h1>
            <p>Sample Text for Image Two</p>
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
            <h1>Nutrition</h1>
            <p>Sample Text for Image Two</p>
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
            <h1>Reading</h1>
            <p>Sample Text for Image Two</p>
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
            <h1>Creativity</h1>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={Sleep}
            alt="Fitness"
            style={{ objectFit: 'cover', height: '50vh' }}
          />
          <Carousel.Caption>
            <h1>Sleep</h1>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

