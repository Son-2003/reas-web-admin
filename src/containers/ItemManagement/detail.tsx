import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxDispatch } from '@/lib/redux/store';

import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { selectItemDetail } from '../ItemRequest/selector';
import { fetchItemDetail } from '../ItemRequest/thunk';
import { ITEMS_MANAGEMENT_ROUTE } from '@/common/constants/router';
import { MethodExchange } from '@/common/enums/methodExchange';
import { ConditionItem } from '@/common/enums/conditionItem';

export const ItemDetail = () => {
  const { itemId, userId } = useParams<{ itemId: string; userId: string }>();
  const dispatch = useDispatch<ReduxDispatch>();
  const item = useSelector(selectItemDetail);
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      dispatch(fetchItemDetail(itemId));
    }
  }, [dispatch, itemId]);

  if (!item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle />
      </div>
    );
  }

  const MethodExchangeLabels = {
    [MethodExchange.PICK_UP_IN_PERSON]: 'Nhận trực tiếp',
    [MethodExchange.DELIVERY]: 'Giao hàng',
    [MethodExchange.MEET_AT_GIVEN_LOCATION]: 'Gặp tại địa điểm hẹn',
    [MethodExchange.NO_METHOD]: 'Không có phương thức',
  };

  const ConditionItemsLabels = {
    [ConditionItem.BRAND_NEW]: 'Brand new',
    [ConditionItem.LIKE_NEW]: 'Like new',
    [ConditionItem.EXCELLENT]: 'Excellent',
    [ConditionItem.GOOD]: 'Good',
    [ConditionItem.FAIR]: 'Fair',
    [ConditionItem.POOR]: 'Poor',
    [ConditionItem.NOT_WORKING]: 'Not working',
    [ConditionItem.NO_CONDITION]: 'No condition',
  };

  const handleBackClick = () => {
    navigate(ITEMS_MANAGEMENT_ROUTE.replace(':id', userId || ''));
  };

  const primaryLocation = item.owner.userLocations.find((loc) => loc.primary);

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-black transition-colors duration-300">
      <div className="flex flex-wrap gap-4 mb-6">
        <Button onClick={handleBackClick} variant="outline">
          Back
        </Button>
      </div>
      <div>
        <div className="w-6 h-6 bg-[url(/logo.svg)] bg-no-repeat bg-cover" />
        <span className="text-black dark:text-white text-xl font-bold">
          {item.itemName}
        </span>
      </div>

      <div className="grid grid-cols-[30%_70%] gap-6 mt-6">
        <div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-500 rounded-full border border-gray-300" />
            <div>
              <span className="text-black dark:text-white font-medium">
                {item.owner.userName}
              </span>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Hoạt động 2 giờ trước
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full max-w-sm h-96 bg-gray-300 rounded-lg overflow-hidden mt-2 mb-5">
              <img
                src={item.imageUrl}
                alt={item.itemName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
            Description:
          </span>
          <p className="text-black dark:text-white text-sm mt-2 mb-4">
            {item.description}
          </p>

          <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
            Information
          </span>
          <div className="overflow-x-auto mt-2">
            <table className="min-w-full border border-gray-300 dark:border-gray-700 text-black dark:text-white text-sm">
              <tbody>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Condition:
                  </td>
                  <td className="p-2 text-green-600 dark:text-green-500 font-bold">
                    {ConditionItemsLabels[item.conditionItem] ||
                      item.conditionItem}
                  </td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Category:
                  </td>
                  <td className="p-2">{item.category.categoryName}</td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Brand:
                  </td>
                  <td className="p-2">{item.brand.brandName}</td>
                </tr>
                <tr className="border-b border-gray-300 dark:border-gray-700">
                  <td className="p-2 text-gray-600 dark:text-gray-400">
                    Method Exchange:
                  </td>
                  <td className="p-2">
                    {item.methodExchanges
                      .map((method) => MethodExchangeLabels[method])
                      .join(', ')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-[41%_59%] gap-6 mt-6">
            <div>
              <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                User Location:
              </span>
              {primaryLocation ? (
                <div className="text-black dark:text-white text-sm mt-2 space-y-3">
                  <p>
                    <strong>Address:</strong>{' '}
                    {primaryLocation.specificAddress.split('//')[1]}
                  </p>
                  <p>
                    <strong>Area:</strong> {primaryLocation.location.area}
                  </p>
                  <p>
                    <strong>District:</strong>{' '}
                    {primaryLocation.location.district}
                  </p>
                  <p>
                    <strong>Ward:</strong> {primaryLocation.location.ward}
                  </p>
                  <p>
                    <strong>Cluster:</strong> {primaryLocation.location.cluster}
                  </p>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No location available
                </p>
              )}
            </div>

            {item.desiredItem && (
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
                  Desired Item:
                </span>
                <div className="text-black dark:text-white text-sm mt-2 space-y-3">
                  <p>
                    <strong>Description:</strong> {item.desiredItem.description}
                  </p>
                  <p>
                    <strong>Min price:</strong>{' '}
                    {item.desiredItem.minPrice?.toLocaleString()} VND
                  </p>
                  <p>
                    <strong>Max price:</strong>{' '}
                    {item.desiredItem.maxPrice?.toLocaleString()} VND
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <span className="text-gray-600 dark:text-gray-400 text-lg font-bold">
              Price:
            </span>
            <span className="text-black dark:text-white text-xl font-bold ml-2">
              {item.price.toLocaleString()} VND
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
