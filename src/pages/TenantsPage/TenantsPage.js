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
    const { activeUser, onLogout } = props;
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
            query.equalTo("role", "tenant");
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

    function removeTenant(userId) {
        const User = new Parse.User();
        const query = new Parse.Query(User);

        // Finds the user by its ID
        query.get(userId).then((user) => {
            // Invokes the "destroy" method to delete the user
            user.destroy().then((response) => {
                const found = tenants.find(element => element.id === userId);
                const index = tenants.indexOf(found);
                tenants.splice(index, 1);
                setTenants([...tenants]);
                console.log('Deleted user', response);
            }, (error) => {
                console.error('Error while deleting user', error);
            })
        });
    }

    function updateTenantContent(fname, lname, email, building, pwd, img, userId) {

        const User = new Parse.User();
        const query = new Parse.Query(User);

        // Finds the user by its ID
        query.get(userId).then((user) => {
            // Updates the data we want
            user.set('email', email);
            user.set('fname', fname);
            user.set('lname', lname);
            user.set('building', building);
            user.set('img', img);

            // Saves the user with the updated data
            user.save().then((response) => {
                const found = tenants.find(element => element.id === userId);
                const index = tenants.indexOf(found);
                tenants[index].fname = fname;
                tenants[index].lname = lname;
                tenants[index].email = email;
                tenants[index].building = building;
                tenants[index].pwd = pwd;
                setTenants([...tenants]);
                console.log('Updated user', response);
            }).catch((error) => {
                console.error('Error while updating user', error);
            });
        });
    }






    const TenantView = filteredTenants.map(tenant => <TenantCard tenant={tenant}
        removeTenant={removeTenant} activeUser={activeUser} updateTenantContent={updateTenantContent} />)

    return (
        <div className="p-messages">
            <HoaNavbr activeUser={activeUser} onLogout={onLogout} />
            <FilterContent isMessagesPage={false} filteredText={filteredText} onFilterChange={e => setFilteredText(e.target.value)} />
            <div className="b-new-message">
                <Button variant="link" onClick={() => setShowModal(true)}>New Tenant</Button>
            </div>
            <TenantsAccordion panels={TenantView} />
            <NewTenantModal isUpdate="false" show={showModal} handleClose={() => setShowModal(false)} tenants={tenants}
                addTenant={setTenants} />
        </div>
    )

}

export default TenantsPage;