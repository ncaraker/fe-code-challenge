import React from 'react';
import PropTypes from 'prop-types';
import TextButton from '../common/TextButton';
import Button from '../common/Button';
import {Link} from 'react-router-dom';
import Modal from 'react-modal';

export default class SpotDetailsModal extends React.Component {
    static propTypes = {
        selectedSpot: PropTypes.object,
        setSpot: PropTypes.func.isRequired
    };

    closeDetailsModal = () => {
        this.props.setSpot(null);
    };

    render() {
        const {
            selectedSpot,
        } = this.props;

        return (
            <Modal
                // Why does '!!' return an error?
                isOpen={!!(selectedSpot)}
                onRequestClose={this.closeDetailsModal}
                shouldCloseOnOverlayClick
                contentLabel="Spot Details"
                closeTimeoutMS={200}
                className="SpotDetailsModal"
            >
                <TextButton
                    className="SpotDetailsModal__Close-Button"
                    onClick={this.closeDetailsModal}
                >
                    X
                </TextButton>
                <h2 className="SpotDetailsModal__Title">Spot Details</h2>
                <h3 className="SpotDetailsModal__SubTitle">{selectedSpot && selectedSpot.title}</h3>
                <p className="SpotDetailsModal__Details">{selectedSpot && selectedSpot.description}</p>
                <Link to="/checkout">
                    <Button color="primary">${selectedSpot && (selectedSpot.price / 100).toFixed(2)} | Book It!</Button>
                </Link>
                
            </Modal>
        );
    }
}
