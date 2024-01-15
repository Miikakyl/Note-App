import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const AlertMsg = () => {

    return (
        <div className="position-absolute d-flex justify-content-center align-items-end w-100 h-100 m-0 p-0">
            <Alert className="alertMsg" variant="warning" dismissible>
                <Alert.Heading>Please write Header and Text in order to save...</Alert.Heading>
            </Alert>
        </div>
    );
}

export default AlertMsg;