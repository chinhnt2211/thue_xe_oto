import config from '@/config';
import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { Link } from 'react-router-dom';

function TableDropdown(props) {

    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
    const [btnDropdownRef, setBtnDropdownRef] = useState(null);
    const [popoverDropdownRef, setPopoverDropdownRef] = useState(null);
    const { styles, attributes, update } = usePopper(btnDropdownRef, popoverDropdownRef, {
        placement: 'left-start',
    });

    const openDropdownPopover = async () => {
        setDropdownPopoverShow(true);
        await update();
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };
    return (
        <div>
            <a
                className="text-blueGray-500 py-1 px-3 relative"
                href="#pablo"
                ref={setBtnDropdownRef}
                onClick={(e) => {
                    e.preventDefault();
                    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                }}
            >
                <i className="fas fa-ellipsis-v"></i>
            </a>
            {/* {dropdownPopoverShow && */}
            <div
                ref={setPopoverDropdownRef}
                style={styles.popper}
                {...attributes.popper}
                className={
                    (dropdownPopoverShow ? 'block ' : 'hidden ') +
                    'bg-white text-base z-50 float-left list-none text-left rounded shadow-lg min-w-[6rem]'
                }
            >

                <Link
                    to={props.path + '/' + props.id.toString() + '/delete'}
                    className={
                        'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 '
                    }
                >
                    Xóa
                </Link>
            </div>
            {/* } */}
        </div>
    );
}

export default TableDropdown;
