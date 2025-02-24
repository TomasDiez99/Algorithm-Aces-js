import Nav from 'react-bootstrap/Nav';
import Drawer from './drawer';
import "../styles/navbar.css";

function ActionBar(props) {
  const {setCategoryFilter, setBrandFilter} = props;

  return (
    <Nav className="action-bar" variant="pills" defaultActiveKey="/home">
      <Nav.Item>
        <div className="action-bar-buttons-container">
            <Drawer
              setCategoryFilter={setCategoryFilter}
              setBrandFilter={setBrandFilter}
            />
        </div>
      </Nav.Item>
    </Nav>
  );
}

export default ActionBar;