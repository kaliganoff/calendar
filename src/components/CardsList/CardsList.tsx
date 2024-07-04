import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import getAllCompanies from "../../services/getAllCompanies";
import "./CardsList.css";
import CompanyCard from "../CompanyCard/CompanyCard";
import Modal from "../Modal/Modal";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    async function getCompanies() {
      try {
        const newCompanies = await getAllCompanies(offset);
        if (newCompanies.length > 0) {
          setCompanies((prevCompanies) => [...prevCompanies, ...newCompanies]);
          setOffset((prevState) => prevState + 10);
          console.log(companies);
          console.log(fetching);
        }
      } catch (error) {
        setModalIsOpen(true);
        setModalText(error.message);
        document.body.style.overflow = "hidden";
        console.log(modalText);
      }
    }
    if (fetching) {
      getCompanies();
    }
    setFetching(false);
  }), [fetching, setFetching];

  useEffect(() => {
    setFetching(true);
  }, [inView]);

  function HandleButtonClick(button) {
    setModalIsOpen(true);
    setModalText(button);
    document.body.style.overflow = "hidden";
  }

  function HandleModalClose() {
    setModalIsOpen(false);
    setModalText("");
    document.body.style.overflow = "";
  }

  return (
    <main className="main">
      <Modal
        isOpen={modalIsOpen}
        onClose={HandleModalClose}
        text={modalText}
       />
      {companies.map((company: Company) => (
        <CompanyCard
          key={company.company.companyId}
          id={company.company.companyId}
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
          onButtonClick={HandleButtonClick}
        />
      ))}
      <div ref={ref} />
      {inView && companies.length < 40 && !modalIsOpen && (
        <div className="loader-container">
          <div className="loader" />
          <p className="text-loader">Подгрузка компаний</p>
        </div>
      )}
    </main>
  );
}

export default CardsList;
