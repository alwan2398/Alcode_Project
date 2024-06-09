export default {
  name: 'projectList',
  type: 'document',
  title: 'ProjectList',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
    },
    {
      name: 'name',
      title: 'Judul Project',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'author',
      title: 'Nama User',
      type: 'string',
    },
    {
      name: 'projectLink',
      title: 'Project Link',
      type: 'string',
    },
    {
      name: 'codeLink',
      title: 'Code Link',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          name: 'tag',
          title: 'Tag',
          type: 'string',
        },
      ],
    },
    {
      name: 'riwayatUpload',
      title: 'Riwayat Upload',
      type: 'object',
      fields: [
        {
          name: 'tanggal',
          title: 'Tanggal',
          type: 'number',
        },
        {
          name: 'bulan',
          title: 'Bulan',
          type: 'number',
        },
        {
          name: 'tahun',
          title: 'Tahun',
          type: 'number',
        },
      ],
    },
  ],
}
