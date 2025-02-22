import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaHeart, FaExternalLinkAlt } from 'react-icons/fa';
import Placeholder from '../../assets/placeholder-image.jpg';

import './ideacard.css';

const IdeaCard: React.FC = () => {
  return (
    <Card className="idea-card" style={{ maxWidth: '300px' }}>
      <div className="idea-card-image">
        <Card.Img variant="top" src={Placeholder} alt="Placeholder" className="idea-card-img" />
        <Button variant="link" className="save-btn">
          <FaHeart className="heart-icon" />
        </Button>
      </div>
      <Card.Body>
        <Card.Title className="idea-card-title">Idea Title</Card.Title>
        <Card.Text className="idea-card-category">Category</Card.Text>
        <Card.Text className="idea-card-description">
          This is a short description. This section should not expand too much or show ellipses if the content is too long.
        </Card.Text>
        <Button variant="outline-primary" className="visit-btn">
          <FaExternalLinkAlt /> Visit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default IdeaCard;



