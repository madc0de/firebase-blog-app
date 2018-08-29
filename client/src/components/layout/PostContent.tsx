import * as React from 'react'

interface Props {
    children: any
}

const PostContent: React.SFC<Props> = (props) => {
  return (
      <main className="post-content">
        {props.children}
      </main>
  )
};

export default PostContent;