import { IComment } from "./icomment";

export interface IPost {
	_id?: number;
	createdAt?: Date;
	title?: string;
	content?: string;
	imageUrl?: string;
	tags?: string[];
	meta?: {
		views?: number,
		favs?: number,
		author?: {
			_id: string;
      nickname?: string,
      avatarUrl?: string,
    },
	};
	relatedPosts?: string[];
	comments?: IComment[];
	hidden?: boolean;
}