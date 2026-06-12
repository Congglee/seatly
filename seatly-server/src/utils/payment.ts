import envConfig from '@/config/environment'

export const buildPaymentCode = (seed: string) => {
  const compactSeed = seed.replace(/-/g, '').slice(0, 10).toUpperCase()
  return `${envConfig.PAYMENT_CODE_PREFIX}${compactSeed}`
}

export const buildSepayQrUrl = ({
  account,
  bank,
  amount,
  description
}: {
  account: string
  bank: string
  amount: number
  description: string
}) => {
  const searchParams = new URLSearchParams({
    acc: account,
    bank,
    amount: String(amount),
    des: description
  })

  return `https://qr.sepay.vn/img?${searchParams.toString()}`
}

export const getPaymentExpiresAt = (now = new Date()) => {
  return new Date(now.getTime() + envConfig.PAYMENT_QR_EXPIRES_MINUTES * 60 * 1000)
}

export const isPaymentExpired = (payment: { expiresAt: Date | null }) => {
  return payment.expiresAt !== null && payment.expiresAt.getTime() <= Date.now()
}

export const parseSepayTransactionDate = (value: string) => {
  const normalizedValue = value.replace(' ', 'T')
  const parsedDate = new Date(normalizedValue)

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date()
  }

  return parsedDate
}

export const getPaymentCodeCandidates = ({ code, content }: { code: string | null; content: string | null }) => {
  const candidates = new Set<string>()

  if (code?.trim()) {
    candidates.add(code.trim().toUpperCase())
  }

  if (content) {
    const pattern = new RegExp(`${envConfig.PAYMENT_CODE_PREFIX}[A-Z0-9]+`, 'gi')
    const matchedCodes = content.match(pattern) ?? []

    matchedCodes.forEach((matchedCode) => {
      candidates.add(matchedCode.toUpperCase())
    })
  }

  return [...candidates]
}
