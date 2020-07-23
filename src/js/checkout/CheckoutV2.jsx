import React from 'react';
import Button from '../common/Button';
import Image from '../common/Image';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {updateSelected} from '../spot/spot-actions';

class Checkout extends React.Component {
    // I'm not clear on what propTypes is at all, I'm only pattern-matching from previous pages here.
    static propTypes = {
        selectedSpot: PropTypes.object,
        onSubmit: PropTypes.func
    }
    state = {
        selectedSpot: null,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: null
    }
    onFirstNameChange = e => {
        const firstName = e.target.value;

        this.setState(() => ({firstName}));
    };

    onLastNameChange = e => {
        const lastName = e.target.value;

        this.setState(() => ({lastName}));
    };

    onEmailChange = e => {
        const email = e.target.value;
        
        // Thank you regex101.com
        if (!email || email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)) {
            this.setState(() => ({email}));
        }
    };

    onPhoneNumberChange = e => {
        const phoneNumber = e.target.value;

        // Thank you regex101.com
        if (!phoneNumber || phoneNumber.match(/^(?=(?:^(?:\+?1\s*(?:[.-]\s*)?)?(?!(?:(?:.*\(.*)|(?:.*\).*)))(?:[2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))|(?:.*\((?:[2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\).*))(?:\+?1\s*(?:[.-]\s*)?)?(?:\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\)?)\s*(?:[.-]\s*)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d{1,15}))?$/)) {
            this.setState(() => ({phoneNumber}));
        }
    };

    // Why am I getting errors with '(e)' but not with 'e'?
    onSubmit = e => {
        if (!this.state.email) {
            e.preventDefault();
            this.setState(() => ({emailError: 'Please provide an Email.'}));
        } else if (!this.state.phoneNumber) {
            e.preventDefault();
            this.setState(() => ({phoneError: 'Please provide a Phone Number.'}));
        } else {
            this.setState(() => ({emailError: '', phoneError: ''}));
            this.props.onSubmit({
                selectedSpot: this.state.selectedSpot,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber
            });

            // I'm stummped on how to proceed to the confirmation page
            return <Redirect to="/confirmation" />;
        }
    }

    render() {
        const {
            selectedSpot
        } = this.props;

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
                        _onSubmit={this.onSubmit}
                    >
                        <label>First Name</label>
                        <input
                            type="text"
                            value={this.state.firstName}
                            onChange={this.onFirstNameChange}
                        />
                        <label>Last Name</label>
                        <input
                            type="text"
                            value={this.state.lastName}
                            onChange={this.onLastNameChange}
                        />
                        <label>Email</label>
                        {this.state.emailError && <p>{this.state.emailError}</p>}
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                        <label>Phone Number</label>
                        {this.state.phoneError && <p>{this.state.phoneError}</p>}
                        <input
                            type="tel"
                            value={this.state.phoneNumber}
                            onChange={this.onPhoneNumberChange}
                        />
                        <Button
                            color="primary"
                            type="submit"
                            className="Checkout__Form__Button"
                        >
                            Purchase for ${(selectedSpot.price / 100).toFixed(2)}
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

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
