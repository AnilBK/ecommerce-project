import { Link } from 'react-router-dom';
import AddCustomProduct from '../components/AdminSystem';
import React, { useEffect, useState } from "react";
import axios from 'axios';

const Admin = () => {
    const [status, setStatus] = useState("Connecting...");
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/status");
                if (res.data.status === "Connected") {
                    setStatus("✅ Connected to Server");
                    setConnected(true);
                } else {
                    setStatus("❌ Server Error");
                    setConnected(false);
                }
            } catch (error) {
                setStatus("❌ Not Connected");
                setConnected(false);
            }
        };

        checkConnection();

        const interval = setInterval(checkConnection, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {connected ? (
                <>
                    <Link to={'/'}>Home</Link>
                    <AddCustomProduct />
                </>
            ) : (
                <p>Waiting for server connection...</p>
            )}
        </div>
    );
};

export default Admin;