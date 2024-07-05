import { useCallback, useEffect, useState } from "react";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [NoCompanies, setNoCompanies] = useState(false);

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
        } else if (companies.length === 0 && newCompanies.length === 0) {
          setNoCompanies(true);
        }
      } catch (error) {
        setModalIsOpen(true);
        setModalText(error instanceof Error ? error.message : "");
        document.body.style.overflow = "hidden";
      }
    }
    if (inView) {
      getCompanies();
    }
  }, [inView]); // eslint-disable-line

  const HandleButtonClick = useCallback((text: string) => {
    setModalIsOpen(true);
    setModalText(text);
    document.body.style.overflow = "hidden";
  }, []);

  function HandleModalClose() {
    setModalIsOpen(false);
    setModalText("");
    document.body.style.overflow = "";
  }

  return (
    <main className="main">
      <Modal
        isOpen={modalIsOpen}
        onClose={() => HandleModalClose()}
        text={modalText}
      />
      {companies.map((company: Company) => (
        <CompanyCard
          key={company.company.companyId}
          company={company}
          onButtonClick={HandleButtonClick}
        />
      ))}
      <div ref={ref} />
      {inView && companies.length < 40 && !modalIsOpen && !NoCompanies && (
        <div className="loader-container">
          <div className="loader" />
          <p className="text-loader">Подгрузка компаний</p>
        </div>
      )}
      {NoCompanies && (
        <div>
          <p className="text-loader">Нет компаний</p>
        </div>
      )}
    </main>
  );
}

export default CardsList;
