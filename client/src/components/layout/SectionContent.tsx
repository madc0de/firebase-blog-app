import * as React from 'react';

interface Props {
  children: any
}

const SectionContent: React.SFC<Props> = (props) => {
  return <div className="section-content">{props.children}</div>
};

export default SectionContent;






