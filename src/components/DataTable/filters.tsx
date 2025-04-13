import { StatusItem } from '@/common/enums/statusItem';
import { Icons } from '../ui/icons';

export const UserStatuses = [
  { value: 'ACTIVE', label: 'Active', icon: Icons.check },
  { value: 'INACTIVE', label: 'Inactive', icon: Icons.cancel },
  { value: 'PENDING', label: 'Pending', icon: Icons.pending },
];

export const ItemStatuses = [
  { value: 'AVAILABLE', label: StatusItem.AVAILABLE, icon: Icons.check },
  { value: 'UNAVAILABLE', label: StatusItem.UNAVAILABLE, icon: Icons.cancel },
  { value: 'EXPIRED', label: StatusItem.EXPIRED, icon: Icons.x },
  {
    value: StatusItem.NO_LONGER_FOR_EXCHANGE,
    label: 'No Longer for Exchange',
    icon: Icons.outStock,
  },
  { value: StatusItem.PENDING, label: 'Pending', icon: Icons.pending },
  { value: StatusItem.REJECTED, label: 'Rejected', icon: Icons.cancel },
];
