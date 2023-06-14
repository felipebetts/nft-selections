export class InvalidAuthError extends Error {
  constructor(
    message: string = 'Usuario nao possui permissao para realizar essa acao.'
  ) {
    super(message)
    this.name = 'InvalidAuthError'
  }
}
