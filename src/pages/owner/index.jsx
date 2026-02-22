import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cookies from "js-cookie";
import "./index.css";

export default function Owner() {
  const [ownerData, setOwnerData] = useState();
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const jwtToken = cookies.get("vehicleServiceToken");
        const response = await axios.get("http://localhost:8000/api/v1/users/userDetails",{
            headers: {
              Authorization: `Bearer ${jwtToken}`
            }
          }
        );
        setOwnerData(response.data.data);
        console.log(response.data, "owner page response");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userData]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setOwnerData(null);
    navigate("/");
  };
  return (
    <div className="owner-container">
      <div className="owner-content">
        <nav className="nav-container">
          <div className="nav-brand">
          <img
            className="logo"
            src="https://res.cloudinary.com/dk2bbhmdm/image/upload/v1769749778/ChatGPT_Image_Jan_30_2026_10_35_46_AMlogo_hgcy8e.png"
            alt="Logo"
          />
        </div>
        </nav>
        <h1>
          Owner Page{ownerData?.name ? ` as ${ownerData.name}` : ""}
        </h1>
        <button className="button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
