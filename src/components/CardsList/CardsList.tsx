import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
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
    highlightTextColor: string;
    textColor: string;
    mainColor: string;
    accentColor: string;
    backgroundColor: string;
  };
  customerMarkParameters: {
    mark: string;
    loyaltyLevel: {
      name: string;
      cashToMark: string;
    };
  };
}

function CardsList() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [offset, setOffset] = useState(0);
  const [fetching, setFetching] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    async function getCompanies() {
      const newCompanies = await getAllCompanies(offset);
      setCompanies((prevCompanies) => [...prevCompanies, ...newCompanies]);
      setOffset((prevState) => prevState + 10);
      console.log(companies);
      console.log(fetching);
    }
    if (fetching) {
      try {
        getCompanies();
      } catch (error) {
        console.log(error);
      }
    }
    setFetching(false);
  }),
    [fetching];

  useEffect(() => {
    setFetching(true);
  }, [inView]);

  return (
    <main className="main">
      {companies.map((company: Company) => (
        <CompanyCard
          key={company.company.companyId}
          name={company.mobileAppDashboard.companyName}
          logo={company.mobileAppDashboard.logo}
          mark={company.customerMarkParameters.mark}
          cashback={company.customerMarkParameters.loyaltyLevel.cashToMark}
          loyaltyLevel={company.customerMarkParameters.loyaltyLevel.name}
          cardBackgroundColor={company.mobileAppDashboard.cardBackgroundColor}
          highlightTextColor={company.mobileAppDashboard.highlightTextColor}
          textColor={company.mobileAppDashboard.textColor}
          mainColor={company.mobileAppDashboard.mainColor}
          accentColor={company.mobileAppDashboard.accentColor}
          backgroundColor={company.mobileAppDashboard.backgroundColor}
        />
      ))}
      <div ref={ref}></div>
      {fetching && (
        <div className="loader-container">
          <div className="loader" />
          <p className="text-loader">Подгрузка компаний</p>
        </div>
      )}
    </main>
  );
}

export default CardsList;
