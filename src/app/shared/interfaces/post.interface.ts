export interface IPostRequest {
    title: string,
    description: string,
    author: string
}

export interface IPostResponse extends IPostRequest{
    id: number
}
