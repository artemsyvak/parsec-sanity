export default {
    name: 'clients',
    title: 'Clients',
    type: 'document',
    fields: [
      {
        title: 'Client Images',
        name: 'images',
        type: 'array',
        of: [{type: 'image'}]
      }
    ],
  }
  