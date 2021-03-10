import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import JobCardList from './JobCardList';
import SearchForm from '../SearchForm';
import JoblyApi from '../api';

/** Bootstrap Components */

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

/**
 * Jobs
 *
 * props: 
 * - none
 * 
 * state: 
 * - an array of jobs like 
 *    [{ id, title, salary, equity, companyHandle, companyName } ...]
 * - isLoading: boolean, indicates if any data is being loaded
 * 
 *  Routes -> Jobs
 **/

function Jobs({ currentUser }) {
	const [ isLoading, setIsLoading ] = useState(true);
	const [ jobs, setJobs ] = useState([]);

	/** When component mounts, get all jobs from API */

	useEffect(function getJobs() {
		async function _getJobs() {
      const jobs = await JoblyApi.getJobs('');
			setJobs(jobs);
			setIsLoading(false);
		}

		_getJobs();
	}, []);

	/** Updates the list of jobs when search is made */

	async function updateJobs(searchTerm) {
		setIsLoading(true);
		const jobs = await JoblyApi.getJobs(searchTerm);
		setJobs(jobs);
		setIsLoading(false);
	}

	if (!currentUser) return <Redirect to="/" />;
	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<Container className="mt-5">
				<Row className="mb-4">
					<SearchForm updateList={updateJobs} />
				</Row>
				<Row>
					<JobCardList jobs={jobs} />
				</Row>
			</Container>
		</div>
	);
}

export default Jobs;
