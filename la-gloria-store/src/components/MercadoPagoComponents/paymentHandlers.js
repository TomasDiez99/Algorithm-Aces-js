import { toast } from 'react-toastify';

export const errorHandlers = {
    cc_rejected_other_reason: () => {
        toast.error("ERROR: Product amount is greater than product stock.");
    },
    cc_rejected_call_for_authorize: () => {
        toast.error("ERROR: Rejected due to validation needed for authorization.");
    },
    cc_rejected_insufficient_amount: () => {
        toast.error("ERROR: Payment rejected due to insufficient funds.");
    },
    cc_rejected_bad_filled_security_code: () => {
        toast.error("ERROR: Rejected due to invalid security code.");
    },
    cc_rejected_bad_filled_date: () => {
        toast.error("ERROR: Rejected due to expiration date issue.");
    },
    cc_rejected_bad_filled_other: () => {
        toast.error("ERROR: Rejected due to form error.");
    },
    default: () => {
        toast.error("ERROR: An error occurred while processing the card payment.");
    }
};

export const resolveErrorText = (statusDetail) => {
    const errorHandler = errorHandlers[statusDetail] || errorHandlers.default;
    errorHandler(); 
};

export const responseHandlers = {
    approved: () => {
        toast.success("Payment approved");
    },
    in_process: () => {
        toast.info("Payment in process");
    },
    pending: () => {
        toast.warn("Payment pending");
    },
    rejected: (statusDetail) => {
        resolveErrorText(statusDetail);
    },
    default: () => {
        toast.warn("Unknown status");
    }
};

export const handleResponse = (status, statusDetail) => {
    const handler = responseHandlers[status] || responseHandlers.default;
    handler(statusDetail);
};

