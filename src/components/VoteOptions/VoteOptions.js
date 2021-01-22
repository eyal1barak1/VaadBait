import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function VoteOptions(props) {

    const { updateOptions } = props;
    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState("");

    function handleAddOption() {
        setOptions(options.concat(newOption));
        setNewOption("");
        updateOptions(options.concat(newOption));
    }
    const optionsView = options.map(option => <div key={option} className="option-added"><Form.Control type="text" value={option} /></div>);

    return (
        <div>
            {optionsView}
            <div><Form.Control type="text" placeholder="New Option" value={newOption} onChange={e => setNewOption(e.target.value)} /></div>
            <div className="option-add-button"><Button onClick={handleAddOption}>Add Option</Button></div>
        </div>
    );
}

export default VoteOptions;