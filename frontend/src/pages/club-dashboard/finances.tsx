import { useState, useEffect } from "react";
import { Check, X, ZoomIn } from "lucide-react";
import api from "../../lib/api";
import { useParams } from "react-router-dom";
import { toast } from "../../lib/toast";
import { Loading } from "../../loading";

export function DashboardFinancesPage() {
  const { id } = useParams();
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState();
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function get_payments() {
      try {
        const res = await api.get(`/payments?club_id=${id}`);
        if (!res.data) {
          toast.error("Something Went Wrong");
        }
        setPayments(res.data);
        setLoading(false);
      } catch (err) {}
    }
    get_payments();
  }, []);

  useEffect(() => {
    setSelectedPayment(payments.length > 0 ? payments[0] : "");
  }, [payments]);
  const handleVerify = async (paymentId: string) => {
    try {
      const res = await api.post("/payments/verify", {
        payment_id: paymentId,
        club_id: id,
      });
      if (res.status !== 200) {
        toast.error("Something Went Wrong");
      }
      setPayments((prev) => prev.filter((p) => p.payment_id !== paymentId));
      toast.success("Payment Verified");
    } catch (err) {}
    // Move to next payment if available
    const remainingPayments = payments.filter(
      (p) => p.payment_id !== paymentId,
    );
    if (remainingPayments.length > 0) {
      setSelectedPayment(remainingPayments[0]);
    }
  };

  const handleReject = async (paymentId: string) => {
    try {
      const res = await api.post("/payments/reject", {
        payment_id: paymentId,
        club_id: id,
      });
      if (res.status !== 200) {
        toast.error("Something Went Wrong");
      }
      setPayments((prev) => prev.filter((p) => p.payment_id !== paymentId));
      toast.success("Payment Verified");
    } catch (err) {}
    // Move to next payment if available
    const remainingPayments = payments.filter(
      (p) => p.payment_id !== paymentId,
    );
    if (remainingPayments.length > 0) {
      setSelectedPayment(remainingPayments[0]);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Payment Verification
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Review and verify payment proofs
          </p>
        </div>

        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-4">
              <Check className="size-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              All caught up!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              No pending payment verifications
            </p>
          </div>
        ) : (
          <div className="flex">
            {/* Left: Payment List */}
            <div className="w-80 border-r border-gray-200 dark:border-gray-800">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {payments.length} pending verification
                  {payments.length !== 1 ? "s" : ""}
                </div>
              </div>
              <div className="overflow-y-auto max-h-[600px]">
                {payments.map((payment) => (
                  <button
                    key={payment.payment_id}
                    onClick={() => setSelectedPayment(payment)}
                    className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      selectedPayment?.payment_id === payment.payment_id
                        ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-blue-600"
                        : ""
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      {payment.username}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {payment.title}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        ${payment.amount}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {payment.booking_time}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Payment Detail */}
            {selectedPayment && (
              <div className="flex-1 p-6">
                <div className="max-w-3xl mx-auto">
                  {/* Payment Proof Image */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        Payment Proof
                      </h3>
                      <button
                        onClick={() => setShowImageModal(true)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <ZoomIn className="size-4" />
                        View Full Size
                      </button>
                    </div>
                    <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <img
                        src={selectedPayment.payment_proof}
                        alt="Payment Proof"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                      Booking Details
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Student Name
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedPayment.username}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Email
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedPayment.email}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Event
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedPayment.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Booking Date
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {selectedPayment.booking_time}
                        </span>
                      </div>
                      <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400">
                          Total Amount
                        </span>
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          ${selectedPayment.amount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleReject(selectedPayment.payment_id)}
                      className="flex-1 px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 text-lg font-medium"
                    >
                      <X className="size-5" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleVerify(selectedPayment.payment_id)}
                      className="flex-1 px-6 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2 text-lg font-medium"
                    >
                      <Check className="size-5" />
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Full Size Image Modal */}
      {showImageModal && selectedPayment && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
          onClick={() => setShowImageModal(false)}
        >
          <div className="max-w-5xl w-full">
            <img
              src={selectedPayment.payment_proof}
              alt="Payment Proof Full Size"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
