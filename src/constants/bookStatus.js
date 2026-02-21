export const BOOK_STATUS_MAP = {
  reading: {
    label: '在读',
    color:
      'bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200',
  },
  finished: {
    label: '已读',
    color:
      'bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200',
  },
  wishlist: {
    label: '想读',
    color:
      'bg-violet-100 text-violet-700 ring-1 ring-inset ring-violet-200',
  },
}

export const STATUS_SEQUENCE = ['reading', 'finished', 'wishlist']

export const FILTER_OPTIONS = [
  { value: 'all', label: '全部' },
  { value: 'reading', label: '在读' },
  { value: 'finished', label: '已读' },
  { value: 'wishlist', label: '想读' },
]

export const SORT_OPTIONS = [
  { value: 'newest', label: '按添加时间（新到旧）' },
  { value: 'oldest', label: '按添加时间（旧到新）' },
  { value: 'title', label: '按书名排序' },
]
