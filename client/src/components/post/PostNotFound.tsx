import * as React from 'react';

const styles = {
  backgroundColor: '#7ac9ed',
  height: `6rem`,
  display: 'grid',
  placeContent: 'center',
  fontSize: '2rem',
  color: '#fff'
}

const PostNotFound: React.SFC<any> = () => (
  <div style={styles} className="post-not-found">
    Sorry couldn't find that post
  </div>
)

export default PostNotFound;