'use client';
import { useEffect, useState } from 'react';

import { Divider, Radio, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import Link from 'next/link';
import { GetDirectorList } from '../utils/GetData';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
export default function Director() {
  const [directors, setDirectors] = useState<Director[]>([]);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const columns: ColumnsType<Director> = [
    {
      title: 'STT',
      dataIndex: 'directorId',
    },
    {
      title: 'Director Name',
      dataIndex: 'directorName',
    },
    {
      title: 'Director Image',
      dataIndex: 'directorImage',
    },
    {
      title: 'Action',
      dataIndex: 'directorId',
      render: (id: number) => (
        <div className="flex">
          <Link href={"/director/"+id}>
            <button className="bg-yellow-500 text-white rounded-full w-28 h-8 left-0">
              Edit
            </button>
          </Link>
          <a >
            <button className="bg-red-500 text-white rounded-full w-28 h-8 left-0">
              Delete
            </button>
          </a>
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
    const res: Director[] = await GetDirectorList();

    if (res) {
      setDirectors(res);
    }
  };

  const paginationData = async () => {
    setLoading(true);
    if (directors) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: directors.length,
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
    sorter: SorterResult<Movie>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setDirectors([]);
    }
  };

  return (
    <div className="">
      <div className="flex flex-row-reverse m-5">
        <Link href="/director/create">
          <button className="bg-blue-500 text-white rounded-full w-28 h-8 left-0">
            Create
          </button>
        </Link>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table
          columns={columns}
          rowKey={(record) => record.directorId}
          dataSource={directors}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
}
export async function getServerSideProps({ req }) {
  const headers = req ? req.headers : {};
  return { props: { headers } };
}
