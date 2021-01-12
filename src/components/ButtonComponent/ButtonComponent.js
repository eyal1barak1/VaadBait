import React, { useState } from 'react';


function ButtonComponent(props) {

    const { activateTab, label, isRead } = props;
    const unReadMsgSrc = "https://cdn3.iconfinder.com/data/icons/mailing-2/96/notification_unread_mail_message_96-512.png";
    const readMsgSrc = "https://icon-library.com/images/read-message-icon/read-message-icon-10.jpg";
    const [isReadState, setIsReadState] = useState(isRead);

    function SetStateOnClick() {
        setIsReadState(true);
        activateTab();
    }
    return (

        <button className='panel__label' role='tab' onClick={SetStateOnClick} >
            {label}
            <img width="20" height="20" src={isReadState ? readMsgSrc : unReadMsgSrc} ></img>
        </button>

    );
}

export default ButtonComponent;