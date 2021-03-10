import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import JobCardList from '../jobs/JobCardList';
import JoblyApi from "../api";

/**
 * CompanyDetail
 * 
 * props:
 *  - currentUser: obj like 
 *     { username, firstName, lastName, email, isAdmin, jobs }
 * 
 * state:
 * -company: an object like { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 * - isLoading: boolean, indicates if any data is being loaded
 * - handle: string, company handle
 * 
 * App -> Routes -> CompanyDetail 
 *
 **/

function CompanyDetail({ currentUser }) {
	const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
	const [ company, setCompany ] = useState(null);
	const { handle } = useParams();

	/** When component mounts, get company detail from API */

	useEffect(function getCompanyDetail() {
		async function _getCompanyDetail() {
			let company;
			try {
				company = await JoblyApi.getCompany(handle);
			} catch (err) {
				setIsError(true);
			}

			setCompany(company);
			setIsLoading(false);
		}

		_getCompanyDetail();
	}, [handle]);

	if (isError) return <Redirect to="/"/>
	if (isLoading) return <div>Loading...</div>;
	if (!currentUser) return <Redirect to="/"/>;
	
  return company && (
    <div className="CompanyDetail mt-5">
      <h2 className="CompanyDetail-title">{company.name}</h2>
      <p className="CompanyDetail-desc mb-5">{company.description}</p>
      <JobCardList jobs={company.jobs}  />
    </div>
  )
  
                                 
}

export default CompanyDetail;
