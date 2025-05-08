import { defineDocumentType, makeSource } from 'contentlayer/source-files';

// Define the Portfolio document type
export const Portfolio = defineDocumentType(() => ({
  name: 'Portfolio',
  filePathPattern: 'portfolio/*.md',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    companyUrl: { type: 'string', required: true },
    logo: { type: 'string', required: true },
    thumbnail: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
    order: { type: 'number', default: 999 },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ''),
    },
  },
}));

// Define the Report document type
export const Report = defineDocumentType(() => ({
  name: 'Report',
  filePathPattern: 'reports/*.md',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    pdfUrl: { type: 'string', required: true },
    thumbnail: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
    order: { type: 'number', default: 999 },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.md$/, ''),
    },
  },
}));

// Create the contentlayer source
export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Portfolio, Report],
}); 