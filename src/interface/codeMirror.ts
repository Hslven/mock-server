interface ICode {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    json: object,
    createTime: number,
    updateTime: number,
    id?: number,
    title?: string,
}

export type { ICode }