import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { format } from "date-fns";
import { useRouter } from "next/router";

import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";

import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import InboxInvoiceDetail from "../invoice-detail";

import { IInboxDetail } from "@/interface/inbox-interface";
import { updateInvoiceStatus } from "@/services/inbox/inbox-service";
import ConfirmationModal from "@/shared/components/confirmation-modal";

interface IProps {
  inboxData: IInboxDetail;
  invoiceId: any;
  setPageNumber: (num: number) => void;
  setInboxList: (arg: any) => void;
}

const InboxDetail = ({
  inboxData,
  invoiceId,
  setPageNumber,
  setInboxList,
}: IProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // STATES
  const [note, setNote] = useState("");

  const [open, setOpen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);

  // FUNCTIONS
  /**
   * Update invoice status api mutation
   */
  const updateStatusMutation = useMutation({
    mutationFn: (data) => updateInvoiceStatus(invoiceId, data),
    onSuccess: (data) => {
      showToast(TOAST_TYPES.success, data?.data?.message);
      setPageNumber(1);
      router.push(`/inbox?id=${router?.query?.id}`);
      queryClient.invalidateQueries(["inboxList"]);
    },
    onError: (error: any) => {
      showToast(TOAST_TYPES.error, error[0]?.detail);
      setOpen(false);
    },
  });
  const handleStatusChange = (status: string, note: string) => {
    const payload: any = {
      status: status,
      approval_notes: note ?? "",
    };
    updateStatusMutation.mutate(payload);
  };

  return (
    <div className="flex-grow h-[calc(100vh-130px)] overflow-y-scroll">
      <div className="p-4">
        <h6 className="text-sm flex items-center gap-4 text-gray-260">
          <span>Bill Status</span>
          {/* <Badge
            className={`
            ${
              inboxData?.invoice_data?.status === "onprocess" &&
              "bg-[#BAE4ED] text-[#0080DC]"
            }
          ${
            inboxData?.invoice_data?.status === "approved" &&
            "bg-[#C3F8DA] text-[#349D62]"
          }
          ${
            inboxData?.invoice_data?.status === "rejected" &&
            "bg-[#F9D2DC] text-[#E94774]"
          }  capitalize border-none`}
          >
            {inboxData?.invoice_data?.status}
          </Badge> */}
        </h6>
        {inboxData?.bill_status && (
          <div className="mb-8 mt-4">
            <p className="text-sm text-color">
              Uploaded by {inboxData?.bill_status?.uploaded_by} on{" "}
              {format(new Date(inboxData?.bill_status?.uploaded_at), "PPP")}
            </p>
            {inboxData?.bill_status?.approval_records?.map(
              (approver, index: number) => (
                <p className="text-sm text-color" key={index}>
                  <span className="capitalize">
                    {" "}
                    {approver?.status === "onprocess"
                      ? "Pending"
                      : approver?.status}
                  </span>{" "}
                  by {approver?.name} on{" "}
                  {format(new Date(approver?.approval_date), "PPP")}
                </p>
              )
            )}
          </div>
        )}
      </div>
      {["approved", "rejected"].includes(
        inboxData?.bill_status?.approval_status
      ) ? (
        inboxData?.bill_status?.approval_note && (
          <div className="p-4">
            <p className="text-gray-270 text-sm mb-2">Note:</p>
            <p className="text-color text-sm">
              {inboxData?.bill_status?.approval_note}
            </p>
          </div>
        )
      ) : (
        <div className="flex items-center justify-end gap-x-14 bg-purple-70 px-6 py-3.5 ml-4">
          <Button
            disabled={updateStatusMutation.isLoading}
            onClick={() => setOpen(true)}
            variant={"destructive"}
            size={"lg"}
          >
            Reject
          </Button>
          <Button
            disabled={updateStatusMutation.isLoading}
            onClick={() => setOpenApprove(true)}
            variant={"submit"}
            size={"lg"}
          >
            Approve
          </Button>
        </div>
      )}

      {/* Inbox Invoice Detail */}
      <InboxInvoiceDetail invoiceDetail={inboxData?.invoice_data} />

      {/* Reject Confirmation Modal */}
      <ConfirmationModal
        btnFuntion={() => handleStatusChange("rejected", note)}
        btnName="Reject"
        variant="destructive"
        open={open}
        setOpen={setOpen}
        title="Reject Invoice"
        description="To reject this invoice give a reason."
        disabled={note === ""}
      >
        <Textarea
          placeholder="Write a note."
          onChange={(e) => setNote(e?.target?.value)}
        />
      </ConfirmationModal>

      {/* Approve Confirmation Modal */}
      <ConfirmationModal
        btnFuntion={() => handleStatusChange("approved", note)}
        btnName="Approve"
        variant="submit"
        open={openApprove}
        setOpen={setOpenApprove}
        title="Approve Invoice"
        description=""
      >
        <Textarea
          placeholder="Write a note."
          onChange={(e) => setNote(e?.target?.value)}
        />
      </ConfirmationModal>
    </div>
  );
};

export default InboxDetail;
