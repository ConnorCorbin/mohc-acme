import React, { memo, Fragment } from 'react';

import DataList from 'data-list/data-list';
import SingleFormField from 'single-form-field.js/single-form-field';

const DiscountType = ({
  labelText,
  stateName,
  noValidate,
  onChange,
  hasErrorMessage,
  listName,
  value,
  errorMessage,
}) => {
  const dataListOptions = ['BOGOF', 'BOGSHP', '3FOR2', 'BXGY', 'X:FOR:Y'];

  return (
    <Fragment>
      <SingleFormField
        labelText={labelText}
        stateName={stateName}
        noValidate={noValidate}
        onChange={onChange}
        hasErrorMessage={hasErrorMessage}
        list={listName}
        value={value}
      />
      <DataList
        listName={listName}
        dataListOptions={dataListOptions}
      />
      {errorMessage}
    </Fragment>
  );
};

export default memo(DiscountType);
