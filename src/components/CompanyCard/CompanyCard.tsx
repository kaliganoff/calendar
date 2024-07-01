import React from "react";
import "./CompanyCard.css";

function CompanyCard({
  name,
  logo,
  mark,
  loyaltyLevel,
  bgcolor,
}: {
  name: string;
  mark: string;
  logo: string;
  loyaltyLevel: string;
  bgcolor: string;
}) {
  return (
    <div style={{ backgroundColor: bgcolor }} className="card">
      <div className="name-logo-container">
        <p className="name">{name}</p>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div className="line" />
      <div className="loyalty-container">
        <p className="mark">{mark}</p>
        <p className="text2">{loyaltyLevel}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
