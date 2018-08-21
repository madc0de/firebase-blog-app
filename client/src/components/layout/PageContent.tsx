import * as React from 'react';

interface PageContentProps {
    children: any
}

const PageContent: React.SFC<PageContentProps> = (props) => {
  return (
      <main className="full-height">
        {props.children}
      </main>
  )
};

export default PageContent;