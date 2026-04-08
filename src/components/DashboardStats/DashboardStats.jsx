import React from "react"
import DashboardCard from "./components/DashboardCard";
import "./DashboardStats.css";

function DashboardStats( {statList} ) {
    return (
        <div className="dashboard__stats">
            {statList.map((stat, index) => {
                return <DashboardCard key={index} value={stat.value} label={stat.label}/>
            })}
      </div>
    )

}

export default DashboardStats;