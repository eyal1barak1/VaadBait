import { useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import TenantCard from "../../components/TenantCard/TenantCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './TenantsPage.css'
import TenantsAccordion from "../../components/Accordion/TenantsAccordion";
import NewTenantModal from "../../components/NewTenantModal/NewTenantModal";
import FilterContent from "../../components/FilterContent/FilterContent";

function TenantsPage(props) {
    const { activeUser, onLogout, tenants, addTenant, removeTenant, updateTenantContent } = props;
    const [showModal, setShowModal] = useState(false);
    const [filteredText, setFilteredText] = useState("");

    if (!activeUser) {
        return <Redirect to="/" />
    }

    let filteredTenants = tenants.filter(tenant =>
        tenant.fname.toLowerCase().includes(filteredText.toLowerCase()) ||
        tenant.lname.toLowerCase().includes(filteredText.toLowerCase()) ||
        tenant.email.toLowerCase().includes(filteredText.toLowerCase())
    );

    const TenantView = filteredTenants.map(tenant => <TenantCard tenant={tenant}
        removeTenant={removeTenant} activeUser={activeUser} updateTenantContent={updateTenantContent} />)

    return (
        <div className="p-messages">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <FilterContent isMessagesPage={false} filteredText={filteredText} onFilterChange={e => setFilteredText(e.target.value)}/>
            <div className="b-new-message">
                <Button variant="link" onClick={() => setShowModal(true)}>New Tenant</Button>
            </div>
            <TenantsAccordion panels={TenantView}  />
            <NewTenantModal isUpdate="false" show={showModal} handleClose={() => setShowModal(false)} addTenant={addTenant} />
        </div>
    )

}

export default TenantsPage;