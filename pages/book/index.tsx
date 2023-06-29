'use client';
import { useEffect, useState } from 'react';
import { Table, notification } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { DeleteBookById, GetBookList } from '../utils/GetData';
import Link from 'next/link';
import { NotificationPlacement } from 'antd/lib/notification';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
export default function BookList() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const columns: ColumnsType<IBook> = [
    {
      title: 'STT',
      dataIndex: 'bookId',
    },
    {
      title: 'Book Name',
      dataIndex: 'bookName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Author',
      dataIndex: 'author',
    },
    {
      title: 'Action',
      dataIndex: 'bookId',
      render: (id: number) => (
        <div className="flex">
          <Link href={'/book/' + id}>
            <button className="bg-yellow-500 text-white rounded-full w-28 h-8 left-0">
              Edit
            </button>
          </Link>
          <button
            onClick={async () => await deleteBook(id)}
            className="bg-red-500 text-white rounded-full w-28 h-8 left-0 ml-1"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
    paginationData();
  }, []);

  useEffect(() => {
    paginationData();
  }, [JSON.stringify(tableParams)]);

  const fetchData = async () => {
    const res: IBook[] = await GetBookList();

    if (res) {
      setBooks(res);
    }
  };

  const deleteBook = async (id: number) => {
    await DeleteBookById(id);
    openNotification('topRight');
    fetchData();
    paginationData();
  };

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification`,
      description: 'Add to Cart successfully !',
      placement,
    });
  };

  const paginationData = async () => {
    setLoading(true);
    if (books) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: books.length,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    }
    setLoading(false);
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IBook>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setBooks([]);
    }
  };

  return (
    <div className="">
      {contextHolder}
      <div className="flex flex-row-reverse m-5">
        <Link href="/book/create">
          <button className="bg-blue-500 text-white rounded-full w-28 h-8 left-0">
            Create
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table
          columns={columns}
          rowKey={(record) => record.bookId}
          dataSource={books}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}
