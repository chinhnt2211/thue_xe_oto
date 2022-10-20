import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { usePopper } from 'react-popper';

import config from '@/config';
import * as httpRequest from '@/utils/httpRequest';

const UserDropdown = () => {
    const accessToken = useSelector((sate) => sate.auth.accessToken);
    const typeToken = useSelector((sate) => sate.auth.typeToken);
    const avatar = useSelector((sate) => sate.auth.avatar);
    const navigate = useNavigate();
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const [btnDropdownRef, setBtnDropdownRef] = useState(null);
    const [popoverDropdownRef, setPopoverDropdownRef] = useState(null);
    const { styles, attributes, update } = usePopper(btnDropdownRef, popoverDropdownRef, {
        placement: 'bottom-end',
    });

    const openDropdownPopover = async () => {
        setDropdownPopoverShow(true);
        await update();
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    const handleLogout = () => {
        const options = {
            headers: {
                Authorization: typeToken + ' ' + accessToken,
            },
        };

        httpRequest.post(import.meta.env.VITE_AUTH_VERSION + '/admin/logout', '', options).then((response) => {
            navigate(config.routes.admin.auth.login);
        });
    };
    return (
        <div>
            <a
                className="text-blueGray-500 block"
                href="#pablo"
                ref={setBtnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <div className="items-center flex">
                    <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                        <img
                            alt="..."
                            className="w-full h-full object-cover rounded-full align-middle border-none shadow-lg"
                            src={avatar}
                        />
                    </span>
                </div>
            </a>
            <div
                ref={setPopoverDropdownRef}
                style={styles.popper}
                {...attributes.popper}
                className={
                    (dropdownPopoverShow ? 'block ' : 'hidden ') +
                    'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
                }
            >
                <Link
                    to={config.routes.admin.profile}
                    className={
                        'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
                    }
                >
                    Hồ sơ
                </Link>
                <div className="h-0 my-2 border border-solid border-blueGray-100" />
                <a
                    href="#pablo"
                    className={
                        'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700'
                    }
                    onClick={handleLogout}
                >
                    Đăng xuất
                </a>
            </div>
        </div>
    );
};

export default UserDropdown;
