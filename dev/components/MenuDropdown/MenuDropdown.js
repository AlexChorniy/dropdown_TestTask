import React, { useContext, useRef, useEffect } from 'react';
import { Menu, Title } from './style';

import dropdownHOC from '@assets/dropdownHoc';

const MenuDropdown = (
    {
        name,
        children,
        clickDropdown,
        color,
    }
) => (
        <Menu onClick={clickDropdown}>
            <Title bgColor={color}>{name}</Title>
            {children}
        </Menu>
    );

export default dropdownHOC(MenuDropdown);
