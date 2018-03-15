'use strict'

const { Command } = require('@adonisjs/ace')

class SendReminder extends Command {
  static get signature () {
    return 'send:reminder'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    this.info('Dummy implementation for send:reminder command')
  }
}

module.exports = SendReminder
