import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { selectItemDetail } from './selector';
import { fetchItemDetail, reviewItemRequest } from './thunk';

export const ItemRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ReduxDispatch>();
  const item = useSelector(selectItemDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchItemDetail(id));
    }
  }, [dispatch, id]);

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  const handleReview = async (statusItem: 'AVAILABLE' | 'REJECTED') => {
    if (!id) return;
    try {
      await dispatch(reviewItemRequest({ id, statusItem })).unwrap();
      alert(
        `Item request has been ${statusItem === 'AVAILABLE' ? 'approved' : 'rejected'} successfully!`,
      );
      navigate('/admin/item-request');
    } catch (error) {
      console.error('Error reviewing item request:', error);
      alert('Failed to process the request.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết yêu cầu: {item.itemName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Mô tả:</strong> {item.description}
          </p>
        </CardContent>
      </Card>

      <div className="mt-4 flex space-x-4">
        <Button onClick={() => handleReview('AVAILABLE')} variant="default">
          Approve
        </Button>
        <Button onClick={() => handleReview('REJECTED')} variant="destructive">
          Discard
        </Button>
        <Button
          onClick={() => navigate('/admin/item-request')}
          variant="outline"
        >
          Quay lại
        </Button>
      </div>
    </div>
  );
};
