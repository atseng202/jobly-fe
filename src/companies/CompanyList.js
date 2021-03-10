import CompanyCard from './CompanyCard';

/**
 * CompanyList
 *
 * props:
 * - companies: array of companies like,
 *     [ { handle, name, description, numEmployees, logoUrl }, ...]
 * 
 * state: none
 * 
 * Companies -> CompanyList
 **/

function CompanyList({companies}) {

  return (
    <ul className="CompanyList container">
      {companies.map(c => 
      <CompanyCard 
        key={c.handle}
        handle={c.handle}
        name={c.name}
        description={c.description}
        logoUrl={c.logoUrl}
      />
      )}
    </ul>
  );
}

export default CompanyList;
