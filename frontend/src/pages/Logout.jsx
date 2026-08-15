import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    const timer = setTimeout(() => {
      navigate("/login");
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="logout-page">
      <div className="logout-card">
        <h1>Logging Out</h1>

        <div className="logout-spinner"></div>

        <p>Please wait while we securely log you out.</p>
      </div>
    </div>
  );
}

export default Logout;
