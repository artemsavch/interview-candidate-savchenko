import {Loader, Popup} from 'semantic-ui-react';

const UpdateInProgressIcon = () => {
    const icon = <Loader active inline size="tiny" />;
    return <Popup content="Update In Progress" trigger={icon} />;
};

export default UpdateInProgressIcon;