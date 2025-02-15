import React from 'react';
import { Link } from 'react-router-dom';
import MugItem from '../components/Mug';
import DiaryRenderer from '../components/Diary';
import Calendar from '../components/Calendar';
import './Home.css';

function Home() {
    return (
        <div className="Home">
            <Link to={'/admin'}><h1>Admin</h1></Link>

            <h1>Design a Mug</h1>
            <MugItem />

            <h1>Design a Notebook</h1>
            <DiaryRenderer />

            <h1>Design a Calendar</h1>
            <Calendar />
        </div>
    );
}

export default Home;