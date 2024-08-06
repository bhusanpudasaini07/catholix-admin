import { TOAST_TYPES, showToast } from "../toast-utils/toast.utils";

export const exportToCsv = (filename: string, data: string) => {
  const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast(TOAST_TYPES.success, "File downloaded successfully!");
};

// add package xlsx
// import * as XLSX from 'xlsx';

// export const exportData = (filename: string, data: string, format: 'csv' | 'xlsx') => {
//   if (format === 'csv') {
//     const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);

//     link.setAttribute('href', url);
//     link.setAttribute('download', filename);
//     link.style.visibility = 'hidden';

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   } else if (format === 'xlsx') {
//     const worksheet = XLSX.utils.csv_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     const xlsxData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

//     const blob = new Blob([xlsxData], { type: 'application/octet-stream' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);

//     link.setAttribute('href', url);
//     link.setAttribute('download', filename);
//     link.style.visibility = 'hidden';

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }
// };
