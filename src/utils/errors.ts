export class InvalidAuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidAuthError'
  }
}
