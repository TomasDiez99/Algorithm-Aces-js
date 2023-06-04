import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function HistoryModal({showHistoryModal, handleShowHistory}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleShowHistory(false);
        navigate(`/history/${email}`);
    };

    return (
        <div
            className={`modal ${showHistoryModal ? "show" : ""}`}
            tabIndex="-1"
            style={{display: showHistoryModal ? "block" : "none"}}
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Shopping cart history</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => handleShowHistory(false)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter client email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                See history
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HistoryModal;
