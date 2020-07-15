import React, { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { finder } from '@assets/helpers'
import { CloseTreeContext } from '@assets/closeTreeContext';

import { element } from 'prop-types';

const withDefault = WrappedComponent => ({ data }) => (
    <CloseTreeContext.Consumer >
        {
            ([state, setState]) => {
                const renderElements = parentState => {
                    const clickDropdown = e => {
                        e.stopPropagation();
                        const text = e.target.innerText;
                        const findByText = finder(text, data, 'name', 'children');
                        const { element, detailInfo } = findByText;
                        changeNestedData(element, state, detailInfo);
                    };

                    const changeNestedData = (insertObj, nestedArr, elementInfo) => {
                        let childNamesArr = [];
                        if (insertObj.children) {
                            childNamesArr = insertObj.children.map(item => ({ name: item.name }));
                        }
                        if (!insertObj.children) {
                            console.log('findByText', elementInfo);
                        }
                        for (let i = 0; i < nestedArr.length; i++) {
                            const element = nestedArr[i];
                            if (element.name === insertObj.name && element.children) {
                                delete nestedArr[i].children;
                                setState([...state]);
                            } else if (element.name === insertObj.name) {
                                nestedArr[i] = { ...element, children: [...childNamesArr] }
                                setState([...state]);
                            } else if (element.children) {
                                changeNestedData(insertObj, element.children, elementInfo);
                            }
                        }
                    };

                    return parentState.map((item) => (
                        <WrappedComponent
                            key={uuidv4()}
                            name={item?.name || ''}
                            children={item?.children ? renderElements(item.children) : null}
                            clickDropdown={clickDropdown}
                        />
                    ))
                }
                return renderElements(state);
            }
        }
    </CloseTreeContext.Consumer>
);

export default withDefault;

// function getNestedObj(arr, clickedName, initialArr) {
//     let i = 0;
//     while (arr[i]?.name !== clickedName) i++;
//     const newChildren = arr[i]?.children;
//     if (newChildren) {
//         const newChildrenNames = newChildren.map(item => ({ name: item.name }));
//         initialArr[i] = { name: arr[i].name, children: newChildrenNames };
//         setRenderData([...initialArr]);
//     }
//     console.log(arr, clickedName);

//     // while (obj && obj.name !== name) {
//     //     obj = obj.nextSibling ? obj.nextSibling.parentNode : null;
//     // }
//     // return obj;
// }
