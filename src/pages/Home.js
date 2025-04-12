import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import MugItem from '../components/Mug';
import DiaryRenderer from '../components/Diary';
import Calendar from '../components/Calendar';
import Product from "../components/Products/Products";

import { getTotalGifts } from '../services/api';
import './Home.css';

const TotalGiftsCount = () => {
    const [count, setCount] = useState(null);

    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const res = await getTotalGifts();
                setCount(res.data.totalGifts || 0);
            } catch (err) {
                console.error("Error fetching total gifts:", err);
            }
        };

        fetchTotal();
    }, []);

    return count !== null ? `(${count})` : "(...)";
};


function Home() {
    return (
        <div className="Home">
            <div className="navbar" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '1rem' }}>
                <Link to={'/home'}><h1>Home</h1></Link>
                <Link to={'/admin'}><h1>Admin</h1></Link>
                <Link to={'/mycart'}><h1>My Cart <TotalGiftsCount /></h1></Link>
            </div>

            <h1>Design a Mug</h1>
            <MugItem />

            <h1>Design a Notebook</h1>
            <DiaryRenderer />

            <h1>Design a Calendar</h1>
            <Calendar />

            <Product />
        </div>
    );
}

export default Home;