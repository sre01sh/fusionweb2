import * as XLSX from 'xlsx';
import saveAs from 'file-saver';

const EXCEL_TYPE: string =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION: string = '.xlsx';

interface SheetData {
  sheetName: string;
  details: any[];
}

export const exportToExcel = (
  data: any[] | SheetData[],
  allowedFields: string[],
  fileName: string,
  multipleSheets: boolean,
  skipHeader: boolean = true,
): void => {
  const wb: XLSX.WorkBook = {
    Sheets: {},
    SheetNames: [],
  };

  if (multipleSheets) {
    (data as SheetData[]).forEach((item: SheetData) => {
      const { sheetName, details } = item;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(details);
      wb.Sheets[sheetName] = ws;
      wb.SheetNames.push(sheetName);
    });
  } else {
    const filteredData = data.map((item) => {
      const filteredItem: { [key: string]: any } = {};
      allowedFields.forEach((field) => {
        if (item.hasOwnProperty(field)) {
          filteredItem[field] = item[field];
        }
      });
      return filteredItem;
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData, { skipHeader: skipHeader });
    // if(!skipHeader) //replace first row
    //   XLSX.utils.sheet_add_aoa(ws, [["a", "b", "c"]]);
    wb.Sheets.data = ws;
    wb.SheetNames.push('data');
  }

  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });

  saveAs(blob, fileName.length > 210 ? fileName.substring(0, 210) : fileName + EXCEL_EXTENSION);
};
