import { create } from "zustand";

interface IInvoiceExtractionProps {
  extractData: any;
  setExtractData: (data: any) => void;

  uploadImage: any;
  setUploadImage: (data: any) => void;
}

export const useInvoiceStore = create<IInvoiceExtractionProps>((set, get) => ({
  extractData: {},
  setExtractData: (data: any) => {
    set(() => ({ extractData: data }));
  },

  uploadImage: null,
  setUploadImage: (data: any) => {
    set(() => ({ uploadImage: data }));
  },
}));
