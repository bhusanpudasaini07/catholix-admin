import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import { IProjectRelease } from '@/interface/project-interface';
import { getProjectRelases } from '@/services/project/project-service';
import { ColumnDef } from '@tanstack/react-table';

const useProjectReleases = () => {
  const router = useRouter();
  const { code } = router?.query;

  const { data: projectReleases, isLoading } = useQuery({
    queryFn: async () => {
      if (code) {
        const response = await getProjectRelases(code);
        return response;
      }
    },
    queryKey: ["projectReleases", code],
  });

  const columns: ColumnDef<IProjectRelease>[] = [
    // Title
    {
      id: "title",
      accessorKey: "title",
      header: "Release",
      cell: ({ row }) => (
        <Link
          href={row?.original?.url}
          target="_blank"
          className="font-medium underline text-primary hover:text-blue-700"
        >
          {row.getValue("title")}
        </Link>
      ),
      enableHiding: false,
    },
    // Date
    {
      id: "date",
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div>
          {moment(row?.getValue("date")).format("Do, MMMM YYYY (dddd)")}
        </div>
      ),
      enableHiding: false,
    },
  ];
  return {
    columns,
    projectReleases,
    isLoading,
  };
};

export default useProjectReleases;
