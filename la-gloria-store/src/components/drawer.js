import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import "../styles/global.css";
import "../styles/navbar.css";
import Offcanvas from 'react-bootstrap/Offcanvas';
import FilterTable from './HomePageComponents/FilterTable/FilterTable';

function Drawer(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {setCategoryFilter, setBrandFilter} = props;
  // Persist selected category and brand
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");


  return (
    <>
      <button className=' btn drawer-button btn-sm' onClick={handleShow}>
      <i class="fa fa-filter" aria-hidden="true"></i>
      </button>

      <Offcanvas show={show} onHide={handleClose} className="full-width-drawer">

        <Offcanvas.Header closeButton>
          
        </Offcanvas.Header>
        
        <Offcanvas.Body className="scrollable-body">
          <FilterTable
                  setCategoryFilter={setCategoryFilter}
                  setBrandFilter={setBrandFilter}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Drawer;