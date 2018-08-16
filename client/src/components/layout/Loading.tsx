import * as React from 'react';

interface Props {
  children: any
}

function Loading ({ children }: Props) {
    return (
      <div className="view-loading">
         {children}
      </div>
    );
}

export default Loading