import * as React from 'react';
import { PostList } from './PostList';


export const PostAdminSection: React.SFC<any> = () => (
  <div className="post-admin-section">
    <div className="post-admin-section--list">
      <PostList />
    </div>
    <div className="post-admin-section--post">
      Post View
    </div>
  </div>
)
  
