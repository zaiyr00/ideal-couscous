import React from 'react';
import {Route, Switch} from "react-router-dom";

import "./Profile.css";
import OrdersProfile from "./OrdersProfile/OrdersProfile";
import Footer from "../Footer/Footer";
import UserNavbarContainer from "../Navbar/UserNavbar/UserNavbarContainer";
import UserProfile from "./UserProfile/UserProfile";

const Profile = ({ userProfile, userOrders, editUserProfileHandler, updateUserProfileHandler }) => {

    return (
        <>
            <UserNavbarContainer />
            <Switch>
                <Route path="/profile/my_orders" component={() => <OrdersProfile userOrders={userOrders}/>}/>
                <Route path="/profile/my_profile" component={() =>
                    <UserProfile
                        userProfile={userProfile}
                        editUserProfileHandler={editUserProfileHandler}
                        updateUserProfileHandler={updateUserProfileHandler}
                    />
                }/>
            </Switch>
            <Footer />
        </>
    );
};

export default Profile;