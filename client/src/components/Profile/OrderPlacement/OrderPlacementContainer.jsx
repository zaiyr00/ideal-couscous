import React, {Component} from 'react';
import {connect} from "react-redux";

import CargoPlacement from "./CargoPlacement/CargoPlacement";
import {editCargoPlacementActionCreator, placeCargoThunkCreator} from "../../../redux/reducers/placement-reducer";
import {getPlacesThunkCreator} from "../../../redux/reducers/cargo-reducer";
import {getUserProfileThunkCreator} from "../../../redux/reducers/user-reducer";
import Preloader from "../../common/Preloader/Preloader";
import TransportationPlacement from "./TransportationPlacement/TransportationPlacement";

class OrderPlacementContainer extends Component {

    componentDidMount() {
        this.props.getUserProfile();
        this.props.getPlaces();
    }

    checkUserType = () => {
        console.log("TYPES " + this.props.user_type)
        switch (this.props.user_type) {
            case "client":
                return (
                    <CargoPlacement
                        cities={this.props.cities}
                        regions={this.props.regions}
                        editCargoPlacementHandler={this.props.editCargoPlacementHandler}
                        cargo={this.props.cargo}
                        placeCargoHandler={this.props.placeCargoHandler}
                    />
                )
            case "driver":
                return (
                    <TransportationPlacement
                        cities={this.props.cities}
                        regions={this.props.regions}
                        editTransportationPlacementHandler={this.props.editTransportationPlacementHandler}
                        transportation={this.props.transportation}
                        placeTransportationHandler={this.props.placeTransportationHandler}
                    />
                )
            default:
                return <></>
        }
    }

    render() {
        if(!this.props.user_type) return <Preloader/>;
        return this.checkUserType();
    }
}

const mapStateToProps = (state) => ({
    user_type: state.userPage.userProfile.user_type,
    cargo: state.placementPage.cargo,
    cities: state.cargoPage.cities,
    regions: state.cargoPage.regions,
})

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: () => {
            dispatch(getUserProfileThunkCreator())
        },
        getPlaces: () => {
            dispatch(getPlacesThunkCreator())
        },
        editCargoPlacementHandler: (nameField, value) => {
            dispatch(editCargoPlacementActionCreator(nameField, value))
        },
        placeCargoHandler: () => {
            dispatch(placeCargoThunkCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlacementContainer);