export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken',
  TableToken: 'TableToken'
} as const

export const Role = {
  Owner: 'Owner',
  Employee: 'Employee',
  Guest: 'Guest'
} as const

export const RoleValues = [Role.Owner, Role.Employee, Role.Guest] as const

export const TableStatus = {
  Available: 'Available',
  Hidden: 'Hidden',
  Reserved: 'Reserved'
} as const

export const TableStatusValues = [TableStatus.Available, TableStatus.Hidden, TableStatus.Reserved] as const

export const DishStatus = {
  Available: 'Available',
  Unavailable: 'Unavailable',
  Hidden: 'Hidden'
} as const

export const DishStatusValues = [DishStatus.Available, DishStatus.Unavailable, DishStatus.Hidden] as const

export const OrderStatus = {
  Pending: 'Pending',
  Processing: 'Processing',
  Rejected: 'Rejected',
  Delivered: 'Delivered',
  Paid: 'Paid'
} as const

export const OrderStatusValues = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Rejected,
  OrderStatus.Delivered,
  OrderStatus.Paid
] as const

export const PaymentStatus = {
  Pending: 'Pending',
  Succeeded: 'Succeeded',
  Failed: 'Failed',
  Expired: 'Expired',
  Cancelled: 'Cancelled',
  NeedsReview: 'NeedsReview'
} as const

export const PaymentStatusValues = [
  PaymentStatus.Pending,
  PaymentStatus.Succeeded,
  PaymentStatus.Failed,
  PaymentStatus.Expired,
  PaymentStatus.Cancelled,
  PaymentStatus.NeedsReview
] as const

export const PaymentMethod = {
  Cash: 'Cash',
  ManualBankTransfer: 'ManualBankTransfer',
  BankTransferQr: 'BankTransferQr'
} as const

export const PaymentMethodValues = [
  PaymentMethod.Cash,
  PaymentMethod.ManualBankTransfer,
  PaymentMethod.BankTransferQr
] as const

export const PaymentProvider = {
  SePay: 'SePay'
} as const

export const PaymentProviderValues = [PaymentProvider.SePay] as const

export const PaymentTransactionStatus = {
  Matched: 'Matched',
  Unmatched: 'Unmatched',
  Duplicate: 'Duplicate',
  AlreadySettled: 'AlreadySettled',
  NeedsReview: 'NeedsReview',
  Ignored: 'Ignored'
} as const

export const PaymentTransactionStatusValues = [
  PaymentTransactionStatus.Matched,
  PaymentTransactionStatus.Unmatched,
  PaymentTransactionStatus.Duplicate,
  PaymentTransactionStatus.AlreadySettled,
  PaymentTransactionStatus.NeedsReview,
  PaymentTransactionStatus.Ignored
] as const

export const ManagerRoom = 'manager' as const
