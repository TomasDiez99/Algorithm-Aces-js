import Nav from 'react-bootstrap/Nav';
import Drawer from './drawer';
import "../styles/navbar.css";

function ActionBar() {
  return (
    <Nav className="action-bar" variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <div className="action-bar-buttons-container">
            <Drawer/>
        </div>
      </Nav.Item>
    </Nav>
  );
}

export default ActionBar;