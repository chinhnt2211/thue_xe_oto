import config from '@/config';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { useLinkClickHandler, useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const LinkClickHandler = (path) => useLinkClickHandler(path);
    return (
        <Navbar fluid={true} rounded={true}>
            <Navbar.Brand href="" onClick={LinkClickHandler(config.routes.home)}>
                <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Thue Oto</span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={
                        <Avatar
                            img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            rounded={true}
                            bordered={true}
                        />
                    }
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>Dashboard</Dropdown.Item>
                    <Dropdown.Item>Settings</Dropdown.Item>
                    <Dropdown.Item>Earnings</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    href={config.routes.home}
                    active={location.pathname === config.routes.home}
                    onClick={LinkClickHandler(config.routes.home)}
                >
                    Trang chủ
                </Navbar.Link>
                <Navbar.Link
                    href={config.routes.search}
                    active={location.pathname === config.routes.search}
                    onClick={LinkClickHandler(config.routes.search)}
                >
                    Tìm kiếm
                </Navbar.Link>
                <Navbar.Link
                    href={config.routes.stations}
                    active={location.pathname === config.routes.stations}
                    onClick={LinkClickHandler(config.routes.stations)}
                >
                    Trạm xe
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
