import React from 'react';

import DataList from 'data-list/data-list';

describe('DataList', () => {
  let wrapper;
  let expectedValues;
  let propValues;
  const getWrapper = ({
    listName = 'Data-list-name',
    dataListOptions = ['option1', 'option2', 'option3'],
  } = {}) => shallow(
    <DataList
    listName={listName}
    dataListOptions={dataListOptions}
    />,
  );

  it('should render component', () => {
    wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it('should render component with correct ID for datalist HTML element', () => {
    wrapper = getWrapper();

    expect(wrapper.find('datalist').props().id).toEqual('Data-list-name');
  });

  it('should render component with correct option values', () => {
    wrapper = getWrapper();

    expectedValues = ['option1', 'option2', 'option3'];
    propValues = wrapper.find('option').map(value => value.props().value);
    expect(propValues).toEqual(expectedValues);
  });

  it('should render component with correct option key values', () => {
    wrapper = getWrapper();

    expectedValues = ['option10', 'option21', 'option32'];
    propValues = wrapper.find('option').map(value => value.key());
    expect(propValues).toEqual(expectedValues);
  });
});
