import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import TenantCard from "../../components/TenantCard/TenantCard";
import HoaNavbr from "../../components/HOANavbar/HOANavbr";
import './TenantsPage.css'
import TenantsAccordion from "../../components/Accordion/TenantsAccordion";
import NewTenantModal from "../../components/NewTenantModal/NewTenantModal";
import FilterContent from "../../components/FilterContent/FilterContent";
import UserModel from "../../model/UserModel";
import Parse from 'parse';

function TenantsPage(props) {
    const { activeUser, onLogout, addTenant, removeTenant, updateTenantContent } = props;
    const [showModal, setShowModal] = useState(false);
    const [filteredText, setFilteredText] = useState("");
    const [tenants, setTenants] = useState([]);
    let filteredTenants = tenants.filter(tenant =>
        tenant.fname.toLowerCase().includes(filteredText.toLowerCase()) ||
        tenant.lname.toLowerCase().includes(filteredText.toLowerCase()) ||
        tenant.email.toLowerCase().includes(filteredText.toLowerCase())
    );
    

    useEffect(() => {
        async function fetchData() {
            const ParseTenants = Parse.Object.extend('User');
            const query = new Parse.Query(ParseTenants);
            // console.log(Parse.User.current().attributes.building);
            query.equalTo("role", "committee");
            const parseTenants = await query.find();
            setTenants(parseTenants.map(parseTenants => new UserModel(parseTenants)));
        }

        if (activeUser) {
            fetchData()
        }
    }, [activeUser])

    if (!activeUser) {
        return <Redirect to="/" />
    }

    
    
    

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