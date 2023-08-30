import { Icon, Popup } from 'semantic-ui-react';

const UpToDateIcon = () => {
    const icon = <Icon name="checkmark" color="green" />;
    return <Popup content="Up to Date" trigger={icon} />;
};

export default UpToDateIcon;