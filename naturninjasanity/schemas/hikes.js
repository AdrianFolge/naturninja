export default {
    name: 'hikes',
    title: 'Hikes',
    type: 'document',
    fields: [
        {
            name: 'img_path',
            title: 'Image Path',
            type: 'string',

        },
        {
            name: 'title',
            title: 'Title',
            type: 'string', 
        },
        {
            name: 'overview',
            title: 'Overview',
            type: 'string', 
        },
        {
            name: 'release_date',
            title: 'Release date',
            type: 'string', 
        },
        {
            name: 'upvotes',
            title: 'Upvotes',
            type: 'number',
            initialValue: 0
        },
        {
            name: 'startpoint',
            title: 'Start Point',
            type: 'array',
            of: [{type: 'number'}]
        },
        {
            name: 'endpoint',
            title: 'End Point',
            type: 'array',
            of: [{type: 'number'}]
        },
        {
            name: 'length',
            title: 'Length',
            type: 'number'
        },
        {
            name: 'mail',
            title: 'Mail',
            type: 'string'
        },
        {
            name: 'city',
            title: 'City',
            type: 'string'
        },

    ]
}