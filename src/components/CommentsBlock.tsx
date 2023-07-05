import React, { FC, ReactNode } from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
// import { IPost } from "../redux/slices/postSlice";
import { IComment } from "../redux/slices/postSlice";

import { Alert, AlertTitle } from "@mui/material";


interface CommentsSectionProps {
  status: "idle" | "pending" | "succeeded" | "failed";
	comments: IComment[];
  isLoading: boolean;
}

const CommentsSection:FC<CommentsSectionProps> = ({status, comments, isLoading}) => {
  switch (status) {
    case "idle":
    case "pending":
      return (
        <>
          {([...Array(5)]).map((_:undefined, index:number) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </>
      );
    case "succeeded": {
      return (
        <>
          {comments.map((comment) => (
            <React.Fragment key={`${comment.published}-${comment.author}`}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={comment.author.nickname} src={comment.author.avatarUrl} />
                  )}
                </ListItemAvatar>
                {isLoading ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <ListItemText
                    primary={comment.author.nickname}
                    secondary={comment.content}
                  />
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </>
      );
    }
    default:
      return (
				<>
					<Alert variant="filled" severity="error">
						<AlertTitle>Error!</AlertTitle>
						Something went wrong when fetching data from the server! <br />
						<strong>Please contact the admin <a href="mailto:healthheaven@admin.com">healthheaven@admin.com</a></strong>
					</Alert>
				</>
			)
  }
}

interface Props extends CommentsSectionProps {
  children: ReactNode
}
export const CommentsBlock:FC<Props> = ({ status, comments, isLoading = true, children }) => {
  
  return (
    <SideBlock title="Comments">
      <List>
        <CommentsSection status={status} comments={comments} isLoading={isLoading}></CommentsSection>
      </List>
      {children}
    </SideBlock>
  );
};
