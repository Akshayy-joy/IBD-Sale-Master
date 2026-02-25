import React from 'react';
import './ToggleSwitch.css';

const keywords = ['Dailytracker', 'MONTHWISE', 'ECpb', 'Country'];

export default function ToggleSwitch({ activeKeyword, setActiveKeyword }) {
    return (
        <div className="filter-bar">
            <span className="filter-label">View:</span>
            {keywords.map((kw) => (
                <button
                    key={kw}
                    className={`filter-chip ${activeKeyword === kw ? 'active' : ''}`}
                    onClick={() => setActiveKeyword(kw)}
                >
                    <span className="chip-dot" />
                    {kw}
                </button>
            ))}
        </div>
    );
}
