type LogLevel = 'error' | 'warn' | 'info' | 'success' | 'debug'

const ANSI_RESET = '\x1b[0m'

const levelColors: Record<LogLevel, string> = {
  error: '\x1b[31m',
  warn: '\x1b[33m',
  info: '\x1b[34m',
  success: '\x1b[32m',
  debug: '\x1b[36m'
}

const isDevelopment = process.env.NODE_ENV === 'development'

const formatErrorMeta = (meta?: unknown) => {
  if (!meta) {
    return ''
  }

  if (meta instanceof Error) {
    return meta.stack || meta.message
  }

  if (typeof meta === 'string') {
    return meta
  }

  try {
    return JSON.stringify(meta)
  } catch {
    return String(meta)
  }
}

const print = (level: LogLevel, message: string, context?: string, meta?: unknown) => {
  if (level === 'debug' && !isDevelopment) {
    return
  }

  const timestamp = new Date().toISOString()
  const contextText = context ? `[${context}] ` : ''
  const header = `${level.toUpperCase()} ${timestamp}`
  const color = levelColors[level]
  const metaText = formatErrorMeta(meta)
  const content = `${contextText}${message}${metaText ? `\n${metaText}` : ''}`
  const output = `${color}${header}${ANSI_RESET} ${content}`

  if (level === 'error') {
    console.error(output)
    return
  }

  console.log(output)
}

const appLogger = {
  error(context: string, message: string, meta?: unknown) {
    print('error', message, context, meta)
  },
  warn(context: string, message: string, meta?: unknown) {
    print('warn', message, context, meta)
  },
  info(context: string, message: string, meta?: unknown) {
    print('info', message, context, meta)
  },
  success(context: string, message: string, meta?: unknown) {
    print('success', message, context, meta)
  },
  debug(context: string, message: string, meta?: unknown) {
    print('debug', message, context, meta)
  }
}

export default appLogger
