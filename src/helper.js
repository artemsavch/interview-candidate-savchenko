import UpdateInProgressIcon from "./components/icons/UpdateInProgressIcon.js";
import UpToDateIcon from "./components/icons/UpToDateIcon.js";

export const computedStatus = (rowData) => {
    if (rowData.finish_date === null) {
        return <UpdateInProgressIcon/>
    }

    if (rowData.firmware_status === 'latest') {
        return <UpToDateIcon/>
    }
}

export const computedDate = (dateString) => {
    if (dateString === null) {
        return 'Update in progress';
    }

    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    }

    return date.toDateString();
}