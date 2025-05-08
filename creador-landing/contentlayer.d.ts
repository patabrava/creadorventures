declare module 'contentlayer/generated' {
  // Portfolio type
  export interface Portfolio {
    _id: string;
    _raw: {
      sourceFileName: string;
      sourceFilePath: string;
      contentType: string;
    };
    type: 'Portfolio';
    title: string;
    description: string;
    companyUrl: string;
    logo: string;
    thumbnail: string;
    featured: boolean;
    order: number;
    body: {
      raw: string;
      html: string;
    };
    slug: string;
  }

  // Report type
  export interface Report {
    _id: string;
    _raw: {
      sourceFileName: string;
      sourceFilePath: string;
      contentType: string;
    };
    type: 'Report';
    title: string;
    description: string;
    date: string;
    pdfUrl: string;
    thumbnail: string;
    featured: boolean;
    order: number;
    body: {
      raw: string;
      html: string;
    };
    slug: string;
  }
  
  // Collections
  export const allPortfolios: Portfolio[];
  export const allReports: Report[];
} 