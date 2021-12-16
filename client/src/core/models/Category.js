import Resource from '@/core/models/Resource'

export default class extends Resource {
  constructor ( api ) {
    super( api )

    this.data = {
      _id: '',
      name: '',
      parent  : '',
      type: '',
      updatedAt: '',
      createdAt: '',
      creator: '',
      deletedAt : '',
    }
  }
}