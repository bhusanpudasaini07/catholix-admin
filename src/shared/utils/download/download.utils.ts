import * as XLSX from "xlsx";
function s2ab(s: any) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}
export const DownloadExcel = (data: any, filename: any) => {
  const mappedData = data;
  const excelData = [
    Object.keys(mappedData[0] || {}),
    ...mappedData?.map((item: any) => Object.values(item)),
  ];
  // Create a new Workbook
  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.aoa_to_sheet(excelData);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Write the Workbook to a binary string
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
};
