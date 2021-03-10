import React from "react";
import { Link } from "react-router-dom";

/** Rendered by CompaniesList, displays Link and brief
 * company information
 */
function CompanyCard({ company }) {
  const { name, description, logoUrl, handle } = company[0];
  return (
    <Link to={`/companies/${handle}`} className="CompanyCard">
      <div>
        <p>{name}</p>
        <p>{description}</p>
        <img src={logoUrl} 
          height="100px" 
          width="100px" 
          alt={name}
        />
      </div>
    </Link>
  );
}

export default CompanyCard;