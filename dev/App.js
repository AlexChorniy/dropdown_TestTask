import React, { useState } from 'react';
import styled from "styled-components";
import MenuDropdown from '@comp/MenuDropdown/MenuDropdown';

import { CloseTreeContext } from '@assets/closeTreeContext';

import { CONSTANTS } from '@assets/mock';

const App = () => {
    const data = CONSTANTS.data;
    const [state, setState] = useState(() => data.map(item => ({ name: item.name })));
    return (
        <Main>
            <CloseTreeContext.Provider value={[state, setState]}>
                <MenuDropdown data={data} />
            </CloseTreeContext.Provider>
        </Main>
    );
};

const Main = styled.div`
    width: 70%;
    min-height: 100vh;
    margin: 0 auto;
    padding-bottom: 20px;
    padding-top: 40px;
    padding-left: 20px;
    padding-right: 20px;
`;

export default App;
