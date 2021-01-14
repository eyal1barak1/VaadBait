import ReactDOM from 'react-dom'
import React from 'react'
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MessagesAccordion.css"
import ButtonComponent from '../ButtonComponent/ButtonComponent';




class Panel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
            isRead: false,
            originalHeight: 0
        };

        this.messageRead = this.messageRead.bind(this);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        this.myInterval = window.setTimeout(() => {
            const el = ReactDOM.findDOMNode(this);
            const height = el.querySelector('.panel__inner').scrollHeight;
            this.setState({
                height,
            });
        }, 333);

        window.addEventListener('resize', this.updateDimensions);
    }

    componentDidUpdate(prevProps, prevState) {
        const el = ReactDOM.findDOMNode(this);
        const height = el.querySelector('.panel__inner').scrollHeight;
        if (prevProps.panel !== this.props.panel) {
            this.myInterval = window.setTimeout(() => {
                // const el = ReactDOM.findDOMNode(this);
                // const height = el.querySelector('.panel__inner').scrollHeight;
                this.setState({
                    height,
                    originalHeight: height,
                });
            }, 333);
        }
    }


    updateDimensions = () => {
        const el = ReactDOM.findDOMNode(this);
        const height = el.querySelector('.panel__inner').scrollHeight;

        this.setState({ height: height });
    };


    componentWillUnmount() {
        clearInterval(this.myInterval);
        window.removeEventListener('resize', this.updateDimensions);
    }


    messageRead() {
        this.props.activateTab();
        // this.setState({ isRead: true })
    }

    render() {

        const { panel, content, activeTab, index, updateMessage } = this.props;
        const { height, isRead } = this.state;
        const isActive = activeTab === index;
        const innerStyle = { height: `${isActive ? height : 0}px` }

        return (
            <div className='panel' role='tabpanel' aria-expanded={isActive}>
                <ButtonComponent activateTab={this.messageRead} label={panel.props.message.title}
                    isRead={panel.props.message.isRead || isActive} updateMessage={updateMessage} id={panel.props.message.id} />
                <div className='panel__inner' style={innerStyle} aria-hidden={!isActive}>
                    <p className='panel__content'> {panel}</p>
                </div>
            </div>
        );
    }
}




class CustomAccordion2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 0
        };

        this.activateTab = this.activateTab.bind(this);
    }

    activateTab(index) {
        this.setState(prev => ({
            activeTab: prev.activeTab === index ? -1 : index
        }));
    }

    render() {

        const { panels, updateMessage } = this.props;
        const { activeTab } = this.state;
        return (
            <div className='accordion' role='tablist'>
                {panels.map((panel, index) =>
                    <Panel
                        key={index}
                        activeTab={activeTab}
                        index={index}
                        panel={panel}
                        activateTab={this.activateTab.bind(null, index)}
                        updateMessage={updateMessage} />
                )}
            </div>
        );
    }
}


function MessagesAccordion(props) {

    const { panels, updateMessage } = props;
    const unReadMsgSrc = "https://cdn3.iconfinder.com/data/icons/mailing-2/96/notification_unread_mail_message_96-512.png";
    const readMsgSrc = "https://icon-library.com/images/read-message-icon/read-message-icon-10.jpg";

    function SetStateOnClick(messageId, activeUserId) {
        updateMessage(messageId, activeUserId);
    }

    return (
        <Accordion variant="success">
            {panels.map((panel, index) =>
                <Card key={index}>
                    <Accordion.Toggle className="accordionHeader"
                        onClick={() => SetStateOnClick(panel.props.message.id, panel.props.activeUser.id)}
                        as={Card.Header} eventKey={index.toString()} >
                        {panel.props.message.title}
                        <img className="readImage" width="20" height="20"          
                            src={panel.props.message.isRead.includes(panel.props.activeUser.id) ? readMsgSrc : unReadMsgSrc} >
                        </img>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>{panel}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            )}
        </Accordion>
    )
}

export default MessagesAccordion;