import { Icon, Popup } from 'semantic-ui-react';

const UnauthorizedUserIcon = () => {
    const icon = <Icon name="warning sign" color="yellow" />;
    return <Popup content="Not Authorized" trigger={icon} />;
};

export default UnauthorizedUserIcon;