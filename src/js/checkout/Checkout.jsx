import React from 'react';
import Button from '../common/Button';
import Image from '../common/Image';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {updateSelected} from '../spot/spot-actions';

/*
 I realize I need form validation in here, but hooking it up within a stateless functional component is really stumping me.
 I had set this up in my class within a class-based component but when I try to implement that one (CheckoutV2.jsx) I'm having a tough time passing props down into the Checkout component.
*/

const Checkout = ({
    selectedSpot,
}) => {
    return (
        <div className="Checkout">
            <div className="Checkout-Card">
                <div className="Checkout__Header">
                    <Link to="/">&#60; Back to Search</Link>
                </div>
                <div className="Checkout__Info">
                    <div className="Checkout__Info__Image">
                        <Image src={selectedSpot.image} />
                    </div>
                    <div className="Checkout__Info__Details">
                        <h2>{selectedSpot.title}</h2>
                        <p>{selectedSpot.distance}</p>
                    </div>
                </div>
                <form
                    className="Checkout__Form"
                >
                    <label>First Name</label>
                    <input
                        type="text"
                        // value={firstName}
                        // onChange={e => this.handleChange(e.target.value, 'firstName')}
                    />
                    <label>Last Name</label>
                    <input
                        type="text"
                        // value={lastName}
                        // onChange={e => this.handleChange(e.target.value, 'lastName')}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        // value={email}
                        // onChange={e => this.handleChange(e.target.value, 'email')}
                    />
                    <label>Phone Number</label>
                    <input
                        type="text"
                        // value={phoneNumber}
                        // onChange={e => this.handleChange(e.target.value, 'phoneNumber')}
                    />
                    <Link to="/confirmation">
                        <Button
                            color="primary"
                            type="submit"
                            className="Checkout__Form__Button"
                        >
                            Purchase for ${(selectedSpot.price / 100).toFixed(2)}
                        </Button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

Checkout.propTypes = {
    selectedSpot: PropTypes.object,
};

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    setSpot: updateSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

