import React, { useEffect, useState } from "react";
import getAllCompanies from "../../services/getAllCompanies";
import "./CardsList.css";
import CompanyCard from "../CompanyCard/CompanyCard";

interface Company {
  company: {
    companyId: string;
  };
  mobileAppDashboard: {
    companyName: string;
    logo: string;
    cardBackgroundColor: string;
  };
  customerMarkParameters: {
    mark: string;
    loyaltyLevel: {
      name: string;
    };
  };
}

function CardsList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function getCompanies() {
      const newCompanies = await getAllCompanies(offset);
      const allCompanies = [...companies, ...newCompanies];
      setCompanies(allCompanies);
      if (companies.length < 40) {
        setOffset((prevState) => prevState + 10);
      }
    }
    if (offset < 50) {
      getCompanies();
    }
  }, [offset, companies]);

  if (companies.length === 0) {
    return (
      <main className="main">
        <div>
          <img className="spinner" src="spinner.gif" alt="" />
          <p>Loading...</p>
        </div>
      </main>
    );
  }

  if (companies.length < 40) {
    return (
      <main className="main">
        {companies.map((company: Company) => (
          <CompanyCard
            key={company.company.companyId}
            name={company.mobileAppDashboard.companyName}
            logo={company.mobileAppDashboard.logo}
            mark={company.customerMarkParameters.mark}
            loyaltyLevel={company.customerMarkParameters.loyaltyLevel.name}
            bgcolor={company.mobileAppDashboard.cardBackgroundColor}
          />
        ))}
        <div>
          <img className="spinner" src="spinner.gif" alt="" />
          <p>Loading...</p>
        </div>
      </main>
    );
  }
  return (
    <main className="main">
      {companies.map((company: Company) => (
        <CompanyCard
          key={company.company.companyId}
          name={company.mobileAppDashboard.companyName}
          logo={company.mobileAppDashboard.logo}
          mark={company.customerMarkParameters.mark}
          loyaltyLevel={company.customerMarkParameters.loyaltyLevel.name}
          bgcolor={company.mobileAppDashboard.cardBackgroundColor}
        />
      ))}
    </main>
  );
}

export default CardsList;
