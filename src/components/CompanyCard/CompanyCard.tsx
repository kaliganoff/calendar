import "./CompanyCard.css";
import Trash from "../Trash/Trash";
import Eye from "../Eye/Eye";

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

function CompanyCard({
  company,
  onButtonClick,
}: {
  company: Company;
  onButtonClick: (text: string) => void;
}) {
  const {
    company: { companyId: id },
    mobileAppDashboard: {
      companyName: name,
      logo,
      cardBackgroundColor,
      highlightTextColor,
      textColor,
      mainColor,
      accentColor,
      backgroundColor,
    },
    customerMarkParameters: {
      mark,
      loyaltyLevel: { name: loyaltyLevel, cashToMark: cashback },
    },
  } = company;

  return (
    <div style={{ backgroundColor: cardBackgroundColor }} className="card">
      <div
        style={{ color: highlightTextColor }}
        className="name-logo-container"
      >
        <p className="name">{name}</p>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="line" />
      <div className="loyalty-container">
        <span style={{ color: highlightTextColor }} className="mark bold-font">
          {mark}
        </span>
        <span style={{ color: textColor }} className="mark-text">
          баллов
        </span>
        <div className="cashback-level-container">
          <div>
            <p style={{ color: mainColor }} className="text3">
              Кешбэк
            </p>
            <p className="text2">{cashback} %</p>
          </div>
          <div>
            <p style={{ color: accentColor }} className="text3">
              Уровень
            </p>
            <p className="text2">
              {loyaltyLevel.charAt(0).toUpperCase() + loyaltyLevel.slice(1)}{" "}
              уровень тест
            </p>
          </div>
        </div>
      </div>
      <div className="line" />
      <div className="button-container">
        <button
          style={{ backgroundColor: cardBackgroundColor }}
          aria-label="Показать"
          type="button"
          className="button icon"
          onClick={() =>
            onButtonClick(`Нажата кнопка «Показать», ид компании: ${id}`)
          }
        >
          <Eye width="8vw" height="8vw" color={mainColor} />
        </button>
        <button
          style={{ backgroundColor: cardBackgroundColor }}
          aria-label="Удалить"
          type="button"
          className="button icon"
          onClick={() =>
            onButtonClick(`Нажата кнопка «Удалить», ид компании: ${id}`)
          }
        >
          <Trash width="8vw" height="8vw" color={accentColor} />
        </button>
        <button
          style={{
            backgroundColor,
            color: mainColor,
          }}
          className="button rectangular-button"
          aria-label="Подробнее"
          type="button"
          onClick={() =>
            onButtonClick(`Нажата кнопка «Подробнее», ид компании: ${id}`)
          }
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
