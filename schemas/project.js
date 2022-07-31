export default {
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',      
      type: 'string',
    },
    {
      name: 'projectType',
      title: 'Project Type',
      type: 'string'
    },
    {
      name: 'detailedInfoTitle',
      title: 'Detailed Info Title',
      type: 'string',
    },
    {
      title: 'Detailed Info Description', 
      name: 'detailedInfoDescription',
      type: 'array', 
      of: [{type: 'block'}]
    },
    {
      title: 'Screenshots',
      name: 'screenshots',
      type: 'array',
      of: [{type: 'image'}]
    }
  ],

  preview: {
    select: {
      title: 'title',      
    },
  },
}
