import * as React from 'react';
import { FaSpinner } from 'react-icons/fa'

function Loading () {
    return (
      <div className="view-loading">
        <FaSpinner className="spin" />
      </div>
    );
}

export default Loading