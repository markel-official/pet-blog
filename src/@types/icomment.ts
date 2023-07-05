export interface IComment {
	published: Date,
	author: {
		_id: string,
		nickname: string,
		avatarUrl: string,
	},
	content: string,
}