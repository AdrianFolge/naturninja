export default {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
        {
            name: 'content',
            title: 'Content',
            type: 'string',

        },
        {
            name: 'user',
            title: 'User Email',
            type: 'string', 
        },
        {
            name: 'hike_id',
            title: 'Hike ID',
            type: 'string', 
        },
    ]
}