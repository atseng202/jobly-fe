/** Bootstrap Components*/  
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card';

/**
 * JobCard
 *
 * props:
 * - job: obj like,
 *     { id, title, salary, equity, (company OR (companyHandle, companyName)) }
 * - isCompanyDetail: boolean to show company name
 *
 * state: none
 *
 * JobCardList -> JobCard
 **/

function JobCard({companyName, title, salary, equity  }) {
  // Helper function to determine whether to include company name
  function companyNameTag() {
    if (companyName) {
      return <Card.Text>{companyName}</Card.Text>
    }
    return null;
  }

  /** helper method to render custom Card component
   * from react-bootstrap
   **/
  function renderCard() {
    return (
      <Card style={{ width: "100%" }} className="row">
        <div>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            {companyNameTag()}
            <Card.Text>Salary: {salary}</Card.Text>
            <Card.Text>Equity: {equity}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    );
  }

  return (
    <Row className="my-2 mx-auto">
      {renderCard()}
    </Row>
  )
}

export default JobCard;
