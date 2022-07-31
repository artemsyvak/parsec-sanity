export default {
    name: 'showreel',
    title: 'Showreel',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
          name: 'video',
          title: 'Video',
          type: 'file'
        },
    ],
  
    preview: {
      select: {
        title: 'title',      
      },
    },
  }
  