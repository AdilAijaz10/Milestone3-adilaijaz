const blogSchema = {
    name: 'Blog',
    type: 'document',
    title: 'Blog',
    fields: [
        {
            name: 'Title',
            type: 'string',
            title: 'Title',
        },
        {
            name: 'content',
            type: 'string',
            title: 'Content',
        },
        {
            name: 'image',
            type: 'image',
            title: 'Image',
            options: {
                hotspot: true, // Allows cropping and focusing on the image
            },
        },
        {
            name: 'dateTime',
            type: 'datetime',
            title: 'Publish Date and Time',
        },
        {
            name: 'author',
            type: 'string',
            title: 'Author',
        },
    ],
};

export default blogSchema;
