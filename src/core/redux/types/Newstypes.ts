//интерфейсы для комментариев
interface IBasicNewsItemComment {
	id: number,
	parent: number,
	type: string
}

interface IDeadNewsItemComment extends IBasicNewsItemComment {
	by: string,
	dead: boolean,
	kids?: number[],
	time: number,
}

interface IDeletedNewsItemComment extends IBasicNewsItemComment {
	deleted: boolean,
	kids?: number[],
	time: number,
}

export interface INormalNewsItemComment extends IBasicNewsItemComment {
	by: string,
	text: string,
	kids?: number[],
	time: number,
}

export type TypesOfComments = IDeadNewsItemComment | IDeletedNewsItemComment | INormalNewsItemComment;

export interface INormalNewsItemCommentWithConvDate extends IBasicNewsItemComment {
	by: string,
	text: string,
	kids?: number[],
	time: string,
}

interface IFullNewsItemComment extends IBasicNewsItemComment {
	by: string,
	kids?: IFullNewsItemComment[],
	time: string
	text: string,
}

//интерфейсы для одной новости
interface IBasicNewsItem {
	by: string,
	descendants: number,
	id: number,
	score: number,
	title: string,
	type: string,
	url: string,
}

export interface ILittleNewsItemCard extends IBasicNewsItem {
	kids?: number[]
	time: number
}

export interface ILittleNewsItemCardWithConvDate extends IBasicNewsItem {
	kids?: number[]
	time: string
}

export interface IFullNewsItem extends IBasicNewsItem {
	kids?: IFullNewsItemComment[]
	time: string
}

//интерфейс для state
export interface NewsState {
	newsList: ILittleNewsItemCardWithConvDate[],
	newsItem: IFullNewsItem,
};

//тип для id
export type NewsID = string | undefined;

//интерфейсы для пропсов
export interface FullNewsItemCardProps {
	newsItemID: NewsID
}

export interface CommentsListProps {
	newsItem: IFullNewsItem
}

export interface RootCommentItemProps {
	rootComment: IFullNewsItemComment
}

export interface LittleNewsItemCardProps {
	news: ILittleNewsItemCardWithConvDate
}

//типизация для экшенов
export enum NewsActionTypes {
	NEWS_LIST = 'NEWS_LIST',
	NEWS_ITEM = 'NEWS_ITEM',
}

interface NewsListAction {
	type: NewsActionTypes.NEWS_LIST,
	payload: ILittleNewsItemCardWithConvDate[]
}

interface NewsItemAction {
	type: NewsActionTypes.NEWS_ITEM,
	payload: IFullNewsItem,
}

export type NewsActions = NewsListAction | NewsItemAction