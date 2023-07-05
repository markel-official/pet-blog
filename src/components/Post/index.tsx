import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';

import { IPost } from '../../@types/ipost';

export interface PostProps extends IPost {
  id?: number;
  isLoading: boolean;
  isFullPost?: boolean;
  isEditable?: boolean;
  children?: ReactNode;
}

export const Post:FC<PostProps> = ({
  id,
  createdAt,
  title,
  imageUrl,
  meta,
  tags,
  relatedPosts,
  comments,
  isFullPost,
  isLoading,
  isEditable,
  children,
}) => {
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = (postId: number) => {};

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {(isEditable && id) && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => onClickRemove(id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        {/* <UserInfo {...user} additionalText={createdAt} /> */}
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          {
            tags?.length !== undefined && tags?.length !== 0 && (
              <ul className={styles.tags}>
                {tags.map((name) => (
                  <li key={name}>
                    <Link to={`/tag/${name}`}>#{name}</Link>
                  </li>
                ))}
              </ul>
            )
          }
          {children && <div className={styles.content}>{children}</div>}

          <ul className={styles.postDetails}>
            {
              meta !== undefined && (
                <li>
                <EyeIcon />
                <span>{meta.views}</span>
              </li>
              )
            }
            {
              comments?.length !== undefined && comments?.length !== 0 && (
                <li>
                  <CommentIcon />
                  <span>{comments.length}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  );
};
