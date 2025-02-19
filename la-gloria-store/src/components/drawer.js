import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import "../styles/global.css";
import "../styles/navbar.css";
import Offcanvas from 'react-bootstrap/Offcanvas';
import FilterTable from './HomePageComponents/FilterTable/FilterTable';

function Drawer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className=' btn drawer-button btn-sm' onClick={handleShow}>
      <i class="fa fa-filter" aria-hidden="true"></i>
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <FilterTable></FilterTable>
        </Offcanvas.Header>
      </Offcanvas>
    </>
  );
}

export default Drawer;