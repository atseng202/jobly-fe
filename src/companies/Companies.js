import JoblyApi from '../api';
import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm';
import CompanyList from './CompanyList';
import { Redirect } from 'react-router-dom';

/** Bootstrap Components */  
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';

/**
 * Companies
 *
 * props:
 * - currentUser, obj like:
 *      { username, firstName, lastName, email, isAdmin, jobs }
 *
 * state:
 * - an array of companies like [ { handle, name, description, numEmployees, logoUrl }, ...]
 * - isLoading: boolean, indicates if any data is being loaded
 * 
 * App -> Routes -> Companies
 **/

function Companies({currentUser }) {
  const [isLoading, setIsLoading ] = useState(true);
	const [ companies, setCompanies ] = useState([]);

  console.debug('currentUser in Companies: ', currentUser);
	/** When component mounts, get all the companies from API */

	useEffect(function getAllCompanies() {
		async function _getAllCompanies() {
			const companies = await JoblyApi.getCompanies('');
      setCompanies(companies);
      setIsLoading(false);
		}

		_getAllCompanies();
	}, []);

	/** Updates the list of companies when search is made */

	async function updateCompanies(searchTerm) {
    setIsLoading(true);
		const companies = await JoblyApi.getCompanies(searchTerm);
    setCompanies(companies);
    setIsLoading(false);
  }
  
  // if (Boolean(currentUser) === false) return <Redirect to="/"/>;
  if (!currentUser) return <Redirect to="/"/>;
  if (isLoading) return <div>Loading...</div>

	return (
		<div>
      <Container className="mt-5">
        <Row className="mb-4">
          <SearchForm updateList={updateCompanies} />
        </Row>
        <Row>
          <CompanyList companies={companies} />
        </Row>
      </Container>
		</div>
	);
}

export default Companies;
