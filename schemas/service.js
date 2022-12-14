import { FileSearchableSelect } from '../components/FileSearchableSelect'

export default {
    name: 'service',
    title: 'Services',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'string'
        },
        {
          title: 'Detailed Info Description', 
          name: 'detailedInfoDescription',
          type: 'array', 
          of: [{type: 'block'}]
        },
        {
            name: 'videoId',
            title: 'Video',
            type: 'string',
            inputComponent: FileSearchableSelect,
        }
    ],
  
    preview: {
      select: {
        title: 'title',      
      },
    },
  }
  