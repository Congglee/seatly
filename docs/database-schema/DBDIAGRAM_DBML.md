# DBDiagram.io DBML

```dbml
Project Seatly_Extended {
  database_type: "PostgreSQL"
  Note: '''
  Extended schema for Seatly.
  Keep original legacy 8-table schema as source of truth.
  Only add new columns and minimal supporting tables.
  '''
}

Table Account {
  id int [pk, increment]
  name varchar [not null]
  email varchar [not null, unique]
  password varchar [not null]
  avatar varchar
  role varchar [not null, note: 'Owner, Employee']
  ownerId int
  createdAt datetime [not null]
  updatedAt datetime [not null]
}

Table Dish {
  id int [pk, increment]
  name varchar [not null]
  price int [not null]
  description varchar [not null]
  image varchar [not null]
  status varchar [not null, note: 'Active, Inactive']
  createdAt datetime [not null]
  updatedAt datetime [not null]

  // Added columns
  isOutOfStock boolean [not null, default: false, note: 'Support out-of-stock indicator']
  stockUpdatedAt datetime [note: 'Last time stock status changed']
  estimatedPrepMinutes int [default: 0, note: 'Estimated cooking/preparation time in minutes']
}

Table DishSnapshot {
  id int [pk, increment]
  name varchar [not null]
  price int [not null]
  description varchar [not null]
  image varchar [not null]
  status varchar [not null]
  dishId int
  updatedAt datetime [not null]
  createdAt datetime [not null]
}

Table RestaurantTable {
  number int [pk]
  capacity int [not null]
  status varchar [not null, note: 'Available, Occupied, Reserved, Cleaning, Disabled']
  token varchar [not null, unique]
  createdAt datetime [not null]
  updatedAt datetime [not null]

  // Added columns
  isOccupied boolean [not null, default: false, note: 'Fast occupancy flag for UI/realtime']
  occupiedAt datetime [note: 'When table became occupied']
  lastActivityAt datetime [note: 'Latest guest/order/request activity at this table']
}

Table Guest {
  id int [pk, increment]
  name varchar [not null]
  tableNumber int
  refreshToken varchar
  refreshTokenExpiresAt datetime
  createdAt datetime [not null]
  updatedAt datetime [not null]

  // Added columns
  sessionStatus varchar [not null, default: 'Active', note: 'Active, Idle, Expired, Closed']
  lastActivityAt datetime [note: 'Used for auto session timeout']
  expiresAt datetime [note: 'Logical session expiry time']
  endedAt datetime [note: 'Session closed/expired at']
}

Table Order {
  id int [pk, increment]
  guestId int
  tableNumber int
  dishSnapshotId int [not null]
  quantity int [not null]
  orderHandlerId int
  status varchar [not null, note: 'Pending, Processing, Rejected, Delivered, Paid']
  createdAt datetime [not null]
  updatedAt datetime [not null]

  // Added columns
  orderBatchId int [note: 'Group line items belonging to the same submit/reorder batch']
  estimatedReadyAt datetime [note: 'Computed ETA for this line item']
}

Table RefreshToken {
  token varchar [pk]
  accountId int [not null]
  expiresAt datetime [not null]
  createdAt datetime [not null]
}

Table Socket {
  socketId varchar [pk]
  accountId int
  guestId int
}

Table OrderBatch {
  id int [pk, increment]
  guestId int [not null]
  tableNumber int [not null]
  code varchar [not null, unique, note: 'Readable batch code for UI/logging']
  status varchar [not null, default: 'Open', note: 'Open, Submitted, Completed, Cancelled, TimedOut']
  submittedAt datetime
  completedAt datetime
  cloneFromBatchId int [note: 'Support quick reorder from an older batch']
  createdAt datetime [not null]
  updatedAt datetime [not null]

  Note: '''
  New table.
  Used to group multiple Order rows into one ordering action.
  Helps quick reorder, history, and duplicate-item merging logic.
  '''
}

Table OrderStatusLog {
  id int [pk, increment]
  orderId int [not null]
  fromStatus varchar [note: 'Previous status']
  toStatus varchar [not null, note: 'New status']
  changedByAccountId int [note: 'Employee who changed the status']
  note varchar [note: 'Optional note/reason']
  createdAt datetime [not null]

  Note: '''
  New table.
  Keeps full order timeline/history for tracking and report screens.
  '''
}

Table TableRequest {
  id int [pk, increment]
  guestId int [not null]
  tableNumber int [not null]
  type varchar [not null, default: 'CallStaff', note: 'CallStaff, NeedSupport, RequestBill, Other']
  status varchar [not null, default: 'Pending', note: 'Pending, Accepted, Resolved, Cancelled']
  note varchar [note: 'Guest note if any']
  handlerId int [note: 'Employee who handled the request']
  resolvedAt datetime
  createdAt datetime [not null]
  updatedAt datetime [not null]

  Note: '''
  New table.
  Supports Call Staff / Gọi nhân viên and related support requests.
  '''
}

/* Original relationships */
Ref: Account.ownerId > Account.id [delete: set null, update: no action]
Ref: DishSnapshot.dishId > Dish.id [delete: set null, update: no action]
Ref: Guest.tableNumber > RestaurantTable.number [delete: set null, update: no action]
Ref: "Order".tableNumber > RestaurantTable.number [delete: set null, update: no action]
Ref: "Order".guestId > Guest.id [delete: set null, update: no action]
Ref: "Order".dishSnapshotId - DishSnapshot.id [delete: cascade, update: cascade]
Ref: "Order".orderHandlerId > Account.id [delete: set null, update: no action]
Ref: RefreshToken.accountId > Account.id [delete: cascade, update: no action]
Ref: Socket.accountId - Account.id [delete: set null, update: no action]
Ref: Socket.guestId - Guest.id [delete: set null, update: no action]

/* New relationships */
Ref: Order.orderBatchId > OrderBatch.id
Ref: OrderBatch.guestId > Guest.id
Ref: OrderBatch.tableNumber > RestaurantTable.number
Ref: OrderBatch.cloneFromBatchId > OrderBatch.id

Ref: OrderStatusLog.orderId > Order.id
Ref: OrderStatusLog.changedByAccountId > Account.id

Ref: TableRequest.guestId > Guest.id
Ref: TableRequest.tableNumber > RestaurantTable.number
Ref: TableRequest.handlerId > Account.id
```
