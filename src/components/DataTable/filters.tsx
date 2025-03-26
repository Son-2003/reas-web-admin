import { Icons } from '../ui/icons';

export const UserStatuses = [
  { value: 'ACTIVE', label: 'Active', icon: Icons.check },
  { value: 'INACTIVE', label: 'Inactive', icon: Icons.cancel },
  { value: 'PENDING', label: 'Pending', icon: Icons.pending },
];

export const ItemRequestStatuses = [
  { value: 'AVAI', label: 'Available', icon: Icons.check },
  { value: 'UNAV', label: 'Unavailable', icon: Icons.cancel },
  { value: 'EXPI', label: 'Expired', icon: Icons.x },
  { value: 'NLFE', label: 'No Longer for Exchange', icon: Icons.outStock },
  { value: 'PEND', label: 'Pending', icon: Icons.pending },
  { value: 'REJE', label: 'Rejected', icon: Icons.cancel },
];
