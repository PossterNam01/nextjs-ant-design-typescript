'use client';
import { useEffect, useState } from 'react';

import { Divider, Radio, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { GetMovieList } from '../utils/GetData';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}
export default function Movies() {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState(false);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  const columns: ColumnsType<IMovie> = [
    {
      title: 'STT',
      dataIndex: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'titile',
    },
    {
      title: 'ReleaseDate',
      dataIndex: 'releaseDate',
    },
    {
      title: 'Running Time',
      dataIndex: 'runningTime',
    },
    {
      title: 'Start Number',
      dataIndex: 'startNumber',
    },
    {
      title: 'Rated',
      dataIndex: 'rated',
    },
    {
      title: 'CreateByEmail',
      dataIndex: 'createByEmail',
    },
    {
      title: 'Casts',
      dataIndex: 'casts',
      render: (item: ICate[]) => (
        <div className="video-meta-genres">
          {item &&
            item.map((cast) => (
              <div key={cast.castId} className="video-meta-genre-cast">
                {cast.castName}
              </div>
            ))}
        </div>
      ),
    },
    {
      title: 'Director',
      dataIndex: 'directorName',
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (id: number) => (
        <div className="flex">
          <a className="flex flex-row-reverse mx-1">
            <button className="bg-yellow-500 text-white rounded-full w-28 h-8 left-0">
              Edit
            </button>
          </a>
          <a className="flex flex-row-reverse ">
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
    const res: IMovie[] = await GetMovieList();

    if (res) {
      setMovies(res);
    }
  };

  const paginationData = async () => {
    setLoading(true);
    if (movies) {
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: movies.length,
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
    sorter: SorterResult<IMovie>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setMovies([]);
    }
  };

  return (
    <div className="">
      <a className="flex flex-row-reverse m-5">
        <button className="bg-blue-500 text-white rounded-full w-28 h-8 left-0">
          Create
        </button>
      </a>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={movies}
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
