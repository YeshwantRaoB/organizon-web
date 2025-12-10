import { Schema, model, models } from 'mongoose';

const auditLogSchema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  action: {
    type: String,
    required: true,
    enum: ['CREATE_ADDRESS', 'UPDATE_ADDRESS', 'DELETE_ADDRESS'],
  },
  addressId: {
    type: Schema.Types.ObjectId,
    ref: 'Address',
  },
  before: {
    type: Object,
  },
  after: {
    type: Object,
  },
}, { timestamps: true });

const AuditLog = models.AuditLog || model('AuditLog', auditLogSchema);

export default AuditLog;
