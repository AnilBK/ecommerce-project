import { Link } from 'react-router-dom';
import AddCustomProduct from '../components/AdminSystem';
import React, { useEffect, useState } from "react";
import axios from 'axios';

function ConnectionStatus() {
    const [status, setStatus] = useState("Connecting...");
  
    useEffect(() => {
      const checkConnection = async () => {
        try {
          const res = await axios.get("http://localhost:5000/api/status");
          if (res.data.status === "Connected") {
            setStatus("✅ Connected to Server");
          } else {
            setStatus("❌ Server Error");
          }
        } catch (error) {
          setStatus("❌ Not Connected");
        }
      };
  
      checkConnection();
  
      const interval = setInterval(checkConnection, 1000);
  
      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div>
        <h3>Server Status: {status}</h3>
      </div>
    );
  }
  
const Admin = () => {
    return (<>
        <ConnectionStatus />
        <Link to={'/'}>Home</Link>
        <AddCustomProduct />
    </>
    );
};

export default Admin;


