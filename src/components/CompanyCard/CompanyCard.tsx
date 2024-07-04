import React from "react";
import "./CompanyCard.css";
import SvgComponent from "../SvgComponent/SvgComponent";
import Eye from "../Eye/Eye";

function CompanyCard({
  id,
  name,
  logo,
  mark,
  cashback,
  loyaltyLevel,
  cardBackgroundColor,
  highlightTextColor,
  textColor,
  accentColor,
  mainColor,
  backgroundColor,
  onButtonClick,
}: {
  id: string;
  name: string;
  mark: string;
  cashback: string;
  logo: string;
  loyaltyLevel: string;
  cardBackgroundColor: string;
  highlightTextColor: string;
  textColor: string;
  mainColor: string;
  accentColor: string;
  backgroundColor: string;
  onButtonClick: (button) => void;
}) {
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
          className="button"
          onClick={() =>
            onButtonClick(`Нажата кнопка Показать, ид компании: ${id}`)
          }
        >
          <Eye width="8vw" height="8vw" color={mainColor} />
        </button>
        <button
          style={{ backgroundColor: cardBackgroundColor }}
          className="button"
          onClick={() =>
            onButtonClick(`Нажата кнопка Удалить, ид компании: ${id}`)
          }
        >
          <SvgComponent width="8vw" height="8vw" color={accentColor} />
        </button>
        <button
          style={{
            color: mainColor,
            marginTop: "2vw",
            backgroundColor,
            border: "none",
            borderRadius: "10%",
            fontSize: "4vw",
          }}
          onClick={() =>
            onButtonClick(`Нажата кнопка Подробнее, ид компании: ${id}`)
          }
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

export default CompanyCard;
