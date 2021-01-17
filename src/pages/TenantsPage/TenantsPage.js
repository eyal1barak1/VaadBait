import { useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import TenantCard from "../../components/TenantCard/TenantCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './TenantsPage.css'
import MessagesAccordion from "../../components/Accordion/MessagesAccordion";

import FilterTenants from "../../components/FilterTenants/FilterTenants";
import TenantsAccordion from "../../components/Accordion/TenantsAccordion";
import NewTenantModal from "../../components/NewTenantModal/NewTenantModal";

function TenantsPage(props) {
    const { activeUser, onLogout, tenants, addTenant, removeTenant, updateTenantContent } = props;
    const [tenantsData, setTenantsData] = useState(tenants);
    const [showModal, setShowModal] = useState(false);
    const [filteredTenants, setFilterdTenants] = useState([]);

    if (tenants !== tenantsData) {
        setTenantsData(tenants);
    }

    if (!activeUser) {
        return <Redirect to="/" />
    }

    function filterTenants(filteredTenantsVar) {
        setFilterdTenants(filteredTenantsVar);
    }

    const TenantView = filteredTenants.map(tenant => <TenantCard tenant={tenant}
        removeTenant={removeTenant} activeUser={activeUser} updateTenantContent={updateTenantContent} />)

    return (
        <div className="p-messages">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <FilterTenants tenants={tenantsData} filterTenants={filterTenants} />
            <div className="b-new-message">
                <Button variant="link" onClick={() => setShowModal(true)}>New Tenant</Button>
            </div>
            <TenantsAccordion panels={TenantView}  />
            <NewTenantModal isUpdate="false" show={showModal} handleClose={() => setShowModal(false)} addTenant={addTenant} />
        </div>
    )

}

export default TenantsPage;