import Resource from '@/core/models/Resource'

export default class extends Resource {
  constructor() {
    super()

    this.data = {
      first_name: '',
      last_name: '',
      email: '',
      role_id: undefined,
      username: '',
      password: ''
    }
  }
}