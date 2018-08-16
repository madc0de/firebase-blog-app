import * as React from 'react';

interface PageContentProps {
    children: any
}

const PageContent: React.SFC<PageContentProps> = (props) => {
  return (
      <main className="page-content">
        {props.children}
      </main>
  )
};

export default PageContent;