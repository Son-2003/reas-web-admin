import { DataTable } from '@/components/DataTable/data-table';
import { DataTablePagination } from '@/components/DataTable/data-table-pagination';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import { columns } from './components/columns';

export const FeedbackUser = () => {
  //   const { t } = useTranslation();
  const navigate = useNavigate();

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Dữ liệu tĩnh thay vì lấy từ API
  const items = [
    { id: 1, itemName: 'Item A', status: 'Pending' },
    { id: 2, itemName: 'Item B', status: 'Approved' },
    { id: 3, itemName: 'Item C', status: 'Rejected' },
  ];

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Feedback" description="" />
        <Button onClick={() => navigate('/admin/newItemRequest')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div className="-mx-4 flex-1 overflow-auto px-4 py-4 lg:flex-row lg:space-x-12 lg:space-y-0">
        <DataTable
          columns={columns}
          data={items} // Sử dụng dữ liệu tĩnh
          searchKey="id"
          placeholder="Tìm kiếm yêu cầu vật phẩm tại đây..."
          dataType="itemRequests"
        />
      </div>
      <DataTablePagination
        currentPage={pageNo}
        totalPages={1} // Do dữ liệu tĩnh ít, chỉ cần 1 trang
        pageSize={pageSize}
        setPageNo={setPageNo}
        setPageSize={setPageSize}
      />
    </>
  );
};
