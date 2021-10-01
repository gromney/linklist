export interface ILinkList {
    id?:string;
    title: string;
    description: string;
    links?: {
      url: string;
      title: string;
      description: string;
    }[]
  
  }