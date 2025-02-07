import React from "react";

export const Footer = () => {
	// 3. utilizar el contexto
  // 3.1 desestructurar store y/o actions
  // 3.2 utilizando el hook useContext()
  // 3.3 con parámetro el Context de appContext.js


  return (
    <footer className="footer bg-body-secondary mt-3 py-3 text-center fw-medium">
      <p>
        Made with <i className="fa fa-heart text-danger" /> by Pedro!
      </p>
    </footer>
  );
};
