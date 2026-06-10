import appLogger from '@/config/logger'
import prisma from '@/database'
import { Cron } from 'croner'

// Cron pattern for every hour
const autoRemoveRefreshTokenJob = () => {
  appLogger.info('cron', 'Register refresh token cleanup job (@hourly)')

  Cron('@hourly', async () => {
    try {
      const result = await prisma.refreshToken.deleteMany({
        where: {
          expiresAt: {
            lt: new Date()
          }
        }
      })

      appLogger.debug('cron', `Refresh token cleanup done. Removed: ${result.count}`)
    } catch (error) {
      appLogger.error('cron', 'Refresh token cleanup failed', error)
    }
  })
}

export default autoRemoveRefreshTokenJob
