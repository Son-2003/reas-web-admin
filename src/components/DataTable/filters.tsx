import { Icons } from '../ui/icons';

export const UserStatuses = [
  { value: 'ACTIVE', label: 'Active', icon: Icons.check },
  { value: 'INACTIVE', label: 'Inactive', icon: Icons.cancel },
  { value: 'PENDING', label: 'Pending', icon: Icons.pending },
];

export const ItemStatuses = [
  { value: 'AVAILABLE', label: 'Available', icon: Icons.check },
  { value: 'UNAVAILABLE', label: 'Unavailable', icon: Icons.cancel },
  { value: 'EXPIRED', label: 'Expired', icon: Icons.x },
  {
    value: 'NO_LONGER_FOR_EXCHANGE',
    label: 'No Longer for Exchange',
    icon: Icons.outStock,
  },
  { value: 'PENDING', label: 'Pending', icon: Icons.pending },
  { value: 'REJECTED', label: 'Rejected', icon: Icons.cancel },
];
