import React, { memo } from 'react';

const DataList = ({
  listName,
  dataListOptions,
}) => {
  const options = dataListOptions.map((option, index) => (
    <option value={option} key={option + index}/>
  ));

  return (
    <datalist id={listName}>
      {options}
    </datalist>
  );
};

export default memo(DataList);
