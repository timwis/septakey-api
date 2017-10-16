exports.register = {
  body: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      address1: { type: 'string' },
      address2: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      zip: {
        type: 'string',
        minLength: 5,
        maxLength: 5
      },
      email: {
        type: 'string',
        format: 'email'
      },
      cellPhone: {
        type: 'string',
        minLength: 10,
        maxLength: 10
      },
      userId: {
        type: 'string',
        pattern: '^[a-zA-Z0-9_@]*$',
        minLength: 4,
        maxLength: 16
      },
      password: {
        type: 'string',
        pattern: '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$'
      },
      securityQuestion: {
        type: 'string',
        enum: [
          'Zip code of living address?',
          'Last 4 digits of Home Phone?',
          'Name of your first pet?',
          'City you were born in?',
          'Street you grew up on?'
        ]
      },
      securityAnswer: { type: 'string' }
    },
    required: [
      'firstName',
      'lastName',
      'address1',
      'city',
      'state',
      'zip',
      'email',
      'cellPhone',
      'userId',
      'password',
      'securityQuestion',
      'securityAnswer'
    ]
  }
}


