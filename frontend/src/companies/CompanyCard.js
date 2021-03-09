import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  const { name, description, logo_url, handle } = company[0];
  return (
    <Link to={`/companies/${handle}`} className="CompanyCard">
      <div>
        <p>{name}</p>
        <p>{description}</p>
        <img src={logo_url} 
          height="100px" 
          width="100px" 
          alt={name}
        />
      </div>
    </Link>
  );
}

export default CompanyCard;