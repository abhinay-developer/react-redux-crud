import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function Home() {
    const loggedInUser = useSelector((state) => state.loggedInUser);
    console.log(loggedInUser)
    return (
        <>
            <div className="app-container">
                <aside className="sidebar">
                    <ul>
                        <li><NavLink to="users" activeClassName="active">Users</NavLink></li>
                        <li><NavLink to="change-password" activeClassName="active">Change Password</NavLink></li>
                    </ul>
                </aside>
                <section className="content">
                    <div>
                        <h3 style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>Welcome  {loggedInUser && loggedInUser[0]?.firstName} , {loggedInUser[0]?.lastName}</h3>
                    </div>
                    <Outlet />
                </section>
            </div>
        </>
    )
}
