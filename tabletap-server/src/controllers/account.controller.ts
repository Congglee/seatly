import envConfig from '@/config/environment'
import appLogger from '@/config/logger'
import { Role } from '@/constants/type'
import prisma from '@/database'
import { hashPassword } from '@/utils/crypto'

export const initOwnerAccount = async () => {
  const accountCount = await prisma.account.count()

  if (accountCount === 0) {
    const hashedPassword = await hashPassword(envConfig.INITIAL_PASSWORD_OWNER)

    await prisma.account.create({
      data: {
        name: 'Owner',
        email: envConfig.INITIAL_EMAIL_OWNER,
        password: hashedPassword,
        role: Role.Owner
      }
    })

    appLogger.success('account', `Create owner account successfully: ${envConfig.INITIAL_EMAIL_OWNER}`)
    return
  }

  appLogger.debug('account', 'Owner account already exists, skipping seed')
}
