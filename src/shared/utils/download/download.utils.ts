import * as XLSX from "xlsx";

interface DataItem {
  [key: string]: any;
}

function s2ab(s: string): ArrayBuffer {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

export function DownloadExcel(
  data: DataItem[] | null | undefined,
  filename: string
): void {
  if (!data || data.length === 0) {
    console.error("No data to export");
    return;
  }

  // Create a new Workbook
  const wb = XLSX.utils.book_new();

  // Convert data to Excel format
  const excelData = [
    Object.keys(data[0] || []),
    ...data.map((item: DataItem) => Object.values(item)),
  ];

  // Convert Excel data to worksheet
  const ws = XLSX.utils.aoa_to_sheet(excelData);

  // Append worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Write the workbook to a binary string
  const excelBinaryString = XLSX.write(wb, {
    bookType: "xlsx",
    type: "binary",
  });

  // Convert the binary string to a Blob
  const excelBlob = new Blob([s2ab(excelBinaryString)], {
    type: "application/octet-stream",
  });

  // Create a link and trigger the download
  const link = document.createElement("a");
  link.href = URL.createObjectURL(excelBlob);
  link.setAttribute("download", `${filename}.xlsx`);
  document.body.appendChild(link);
  link.click();
}
