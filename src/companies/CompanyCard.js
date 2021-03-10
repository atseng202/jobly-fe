import { Link } from 'react-router-dom';

/** Bootstrap Components*/  
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card';

/**
 * CompanyCard
 * NOTE: CompanyCard might be wrapped as a Link to CompanyDetail
 * 
 * props:
 * - handle: string
 * - name: string
 * - description: string
 * - logoUrl: string
 *
 * state: none
 *
 * CompanyList -> CompanyCard
 **/

const THUMBNAIL_STYLES = {
  width: "50px",
  height: "50px",
  objectFit: "cover"
}
function CompanyCard({ handle, name, description, logoUrl }) {

  /** helper method to render custom Card component 
   * from react-bootstrap
   **/  
  function renderCard() {
    return ( 
      <Card style={{width: "100%"}} className="row">
        <div>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
          </Card.Body>
        </div>
        <div>
          <Card.Img variant={handle} src={logoUrl} style={THUMBNAIL_STYLES}/>
        </div>
      </Card>
    );
  }

  return (
    <Row className="my-2 mx-auto">
      <Link to={`companies/${handle}`} className="container">
        {renderCard()}
      </Link>
    </Row>
  );
}

export default CompanyCard;