import React, { useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';

function CaseList() {
  const [value, onChange] = useState([new Date(), new Date()]);
console.log(value)
  return (
    <div className="expanded-card">
      <DateTimeRangePicker
        autoFocus={true}
        format="y-MM-dd h:mm:ss a"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
export default CaseList