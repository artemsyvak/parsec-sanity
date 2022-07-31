export default {
    name: 'team',
    title: 'Team',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',      
        type: 'string',
      },
      {
        name: 'position',
        title: 'Position',
        type: 'string'
      },
      {
        name: 'avatar',
        title: 'Avatar',
        type: 'image',
      }      
    ],
  
    preview: {
      select: {
        title: 'name',      
      },
    },
  }
  