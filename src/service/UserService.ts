import { AppDataSource } from '../data-source'
import { User } from '../entity/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Service } from './Service'

interface ICreateUser {
  name: string
  email: string
  password: string
}

interface IAuth {
  email: string
  password: string
}

const ACCESS_SECRET = '34789v5yn23487ytgn2937482'
const REFRESH_SECRET = '9487gf32yht947dj03214sjh0'

export class UserService extends Service {
  private userRepository = AppDataSource.getRepository(User)

  constructor() {
    super(User)
  }

  async create({ email, name, password }: ICreateUser) {
    if (!email) {
      throw new Error('Invalid Emails')
    }

    const userAlreadyExists = await this.userRepository.findOne({
      where: { email },
    })
    if (userAlreadyExists) {
      throw new Error('User already exists')
    }

    const salt = 12
    const passwordHash = await bcrypt.hash(password, salt)
    const user = this.userRepository.create({
      name,
      email,
      password: passwordHash,
    })
    await this.userRepository.save(user)

    return user
  }

  async authenticate({ email, password }: IAuth) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      throw new Error('Email ou senha incorretos')
    }

    const passwordMatches = await bcrypt.compare(password, user.password)
    if (!passwordMatches) {
      throw new Error('Email ou senha incorretos')
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      ACCESS_SECRET,
      {
        subject: String(user.id),
        expiresIn: '1h',
      }
    )
    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      REFRESH_SECRET,
      {
        subject: String(user.id),
        expiresIn: '1d',
      }
    )

    return { accessToken, refreshToken }
  }

  async refreshAccessToken(refreshToken: string) {
    const { sub } = jwt.verify(refreshToken, REFRESH_SECRET)
    if (!sub) {
      throw new Error('invalid token')
    }

    const user = await this.userRepository.findOne({
      where: { id: Number(sub) },
    })
    if (!user) {
      throw new Error('Usuario nao encontrado')
    }

    const accessToken = jwt.sign({ email: user.email }, ACCESS_SECRET, {
      subject: String(user.id),
      expiresIn: '1h',
    })

    return {
      accessToken,
      refreshToken,
    }
  }
}
