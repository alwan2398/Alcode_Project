export default {
  name: 'comment',
  type: 'document',
  title: 'Comment',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'comment',
      type: 'text',
      title: 'Comment',
    },
    {
      name: 'project',
      type: 'reference',
      to: [{type: 'projectList'}],
      title: 'Project',
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today',
      },
    },
  ],
}
