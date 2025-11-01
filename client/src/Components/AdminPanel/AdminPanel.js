import React from 'react'
import AdminNavBar from "./AdminNavBar";
import AdminFooter from "./AdminFooter";
import AdminScreen from './AdminScreen';

const AdminPanel = ({ admin, onLogout }) => {
  return (
    <div>
      <AdminNavBar admin={admin} onLogout={onLogout} />
      <AdminScreen/>
      <AdminFooter/>
    </div>
  )
}

export default AdminPanel
