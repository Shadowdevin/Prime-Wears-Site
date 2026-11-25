import React, { useState } from 'react';
import { useOrders } from '../../context/OrderContext';
import { formatNGN } from '../../context/CartContext';
import { CustomOrder, QuoteStatus } from '../../types';
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Scissors,
  Eye,
  Send,
  MessageSquare,
  FileText,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { customOrders, updateOrderStatus } = useOrders();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<CustomOrder | null>(
    customOrders[0] || null
  );

  // Edit Quote State
  const [quoteInput, setQuoteInput] = useState<string>('');
  const [tailorNotesInput, setTailorNotesInput] = useState<string>('');
  const [statusInput, setStatusInput] = useState<QuoteStatus>('under_review');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // When selected order changes, initialize inputs
  const handleSelectOrder = (order: CustomOrder) => {
    setSelectedOrder(order);
    setQuoteInput(order.quotedAmountNGN ? order.quotedAmountNGN.toString() : '');
    setTailorNotesInput(order.adminNotes || '');
    setStatusInput(order.quoteStatus);
    setActionSuccess(null);
  };

  const handleSaveQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const numericQuote = quoteInput ? parseFloat(quoteInput) : undefined;
    updateOrderStatus(selectedOrder.id, statusInput, numericQuote, tailorNotesInput);

    // Update local selected state
    setSelectedOrder({
      ...selectedOrder,
      quoteStatus: statusInput,
      quotedAmountNGN: numericQuote,
      adminNotes: tailorNotesInput
    });

    setActionSuccess('Order status and quotation updated successfully.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const filteredOrders = customOrders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.quoteStatus === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.email.toLowerCase().includes(q) ||
      order.phone.includes(q) ||
      order.garmentCategory.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: QuoteStatus) => {
    switch (status) {
      case 'under_review':
        return (
          <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-semibold">
            Under Review
          </span>
        );
      case 'quotation_sent':
        return (
          <span className="text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">
            Quotation Sent
          </span>
        );
      case 'approved':
        return (
          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
            Quote Approved
          </span>
        );
      case 'in_production':
        return (
          <span className="text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px] font-semibold">
            In Production
          </span>
        );
      case 'ready_for_fitting':
        return (
          <span className="text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded text-[11px] font-semibold">
            Ready for Fitting
          </span>
        );
      case 'completed':
        return (
          <span className="text-neutral-700 bg-neutral-100 border border-neutral-300 px-2 py-0.5 rounded text-[11px] font-semibold">
            Fulfilled
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Prime Wears Atelier Internal Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 font-serif-luxury">
              Custom Order Review & Quotation Management
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Authorized staff interface to verify customer measurements, inspect uploaded references, set confirmed pricing in NGN, and manage pattern drafting.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-neutral-500 block uppercase font-semibold">
                Total Custom Enquiries
              </span>
              <span className="text-xl font-extrabold text-neutral-900 tabular-nums">
                {customOrders.length}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-4 rounded-lg border border-neutral-200 shadow-xs flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order reference (e.g. PW-ORD-2026), client name, phone..."
              className="w-full bg-neutral-50 border border-neutral-200 rounded pl-9 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            {[
              { id: 'all', label: 'All Orders' },
              { id: 'under_review', label: 'Under Review' },
              { id: 'quotation_sent', label: 'Quoted' },
              { id: 'approved', label: 'Approved' },
              { id: 'in_production', label: 'In Production' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded whitespace-nowrap font-semibold transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Order List (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-lg border border-neutral-200 shadow-xs overflow-hidden flex flex-col">
            <div className="p-3.5 bg-neutral-50 border-b border-neutral-200 text-xs font-bold text-neutral-700 uppercase tracking-wider flex justify-between">
              <span>Orders Queue ({filteredOrders.length})</span>
              <span className="text-[11px] font-normal text-neutral-500">Sorted by newest</span>
            </div>

            <div className="divide-y divide-neutral-100 max-h-[700px] overflow-y-auto">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-xs text-neutral-400">
                  No orders match current criteria.
                </div>
              ) : (
                filteredOrders.map((order) => {
                  const isSelected = selectedOrder?.id === order.id;
                  return (
                    <div
                      key={order.id}
                      onClick={() => handleSelectOrder(order)}
                      className={`p-4 cursor-pointer transition-all hover:bg-neutral-50 ${
                        isSelected
                          ? 'bg-amber-50/50 border-l-4 border-l-amber-600'
                          : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-neutral-900 tracking-wider">
                          {order.id}
                        </span>
                        {getStatusBadge(order.quoteStatus)}
                      </div>

                      <h4 className="text-xs font-bold text-neutral-800 line-clamp-1">
                        {order.customerName}
                      </h4>

                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                        <span className="capitalize">{order.garmentCategory}</span>
                        <span>·</span>
                        <span>{order.deliveryCity}</span>
                        <span>·</span>
                        <span className="tabular-nums">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs pt-1.5 border-t border-neutral-100">
                        <span className="text-[11px] text-neutral-500">Quoted:</span>
                        <span className="font-bold text-neutral-900 tabular-nums">
                          {order.quotedAmountNGN ? formatNGN(order.quotedAmountNGN) : 'Pending Review'}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Order Details & Master Cutter Inspection (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-neutral-200 shadow-xs p-6 space-y-6">
            {selectedOrder ? (
              <>
                {/* Order Top Summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-neutral-900 font-mono">
                        {selectedOrder.id}
                      </h2>
                      {getStatusBadge(selectedOrder.quoteStatus)}
                    </div>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Received {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-neutral-500 uppercase font-semibold block">
                      Target Completion Date
                    </span>
                    <span className="text-xs font-bold text-neutral-900">
                      {selectedOrder.requestedCompletionDate || 'Standard (2 Weeks)'}
                    </span>
                  </div>
                </div>

                {/* Reference Photo and Garment Overview */}
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col sm:flex-row gap-4 items-start">
                  {selectedOrder.referenceImage ? (
                    <img
                      src={selectedOrder.referenceImage}
                      alt="Style Reference"
                      className="w-24 h-32 object-cover rounded bg-neutral-200 border border-neutral-300 shrink-0"
                    />
                  ) : (
                    <div className="w-24 h-32 rounded bg-neutral-200 flex items-center justify-center text-neutral-400 text-xs shrink-0">
                      No Photo
                    </div>
                  )}

                  <div className="flex-1 space-y-1.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-700 block">
                        Category: {selectedOrder.garmentCategory}
                      </span>
                      <h3 className="text-sm font-bold text-neutral-900">
                        {selectedOrder.selectedDesignName || 'Custom Style Reference'}
                      </h3>
                    </div>

                    <div>
                      <span className="font-semibold text-neutral-700">Fabric: </span>
                      <span className="text-neutral-900">{selectedOrder.fabricPreference || 'Not specified'}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-neutral-700">Colour: </span>
                      <span className="text-neutral-900">{selectedOrder.colorPreference}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-neutral-700">Quantity: </span>
                      <span className="text-neutral-900">{selectedOrder.quantity} sets</span>
                    </div>

                    {selectedOrder.modificationsDescription && (
                      <div className="pt-2 border-t border-neutral-200 text-neutral-700">
                        <span className="font-semibold block mb-0.5">Customer Modifications:</span>
                        <p className="italic bg-white p-2 rounded border border-neutral-200 text-[11px]">
                          &ldquo;{selectedOrder.modificationsDescription}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Measurements Inspection Sheet */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Scissors className="w-4 h-4 text-amber-600" />
                      <span>Body Measurements Sheet</span>
                    </h3>
                    {selectedOrder.measurements && (
                      <span className="text-[11px] font-bold text-neutral-600 uppercase bg-neutral-100 px-2 py-0.5 rounded">
                        Unit: {selectedOrder.measurements.unit === 'cm' ? 'Centimeters' : 'Inches'}
                      </span>
                    )}
                  </div>

                  {selectedOrder.orderType === 'corporate_shoes' && selectedOrder.shoeSpecs ? (
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Shoe Size:</span>
                        <span className="font-bold text-neutral-900 text-sm">EU {selectedOrder.shoeSpecs.shoeSizeEU}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Width:</span>
                        <span className="font-bold text-neutral-900 uppercase">{selectedOrder.shoeSpecs.footWidth}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Foot Length:</span>
                        <span className="font-bold text-neutral-900">{selectedOrder.shoeSpecs.footLength || '-'}</span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[11px]">Monogram:</span>
                        <span className="font-bold text-neutral-900 font-mono">{selectedOrder.shoeSpecs.monogramInitials || 'None'}</span>
                      </div>
                    </div>
                  ) : selectedOrder.measurements ? (
                    <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Shoulder:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.shoulder || '-'}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Chest:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.chest || '-'}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Neck:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.neck || '-'}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Sleeve:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.sleeveLength || '-'}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Shirt Length:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.garmentLength || '-'}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Trouser Waist:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.waist || '-'}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Trouser Length:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.trouserLength || '-'}
                        </span>
                      </div>
                      <div className="bg-white p-2 rounded border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase">Thigh:</span>
                        <span className="font-bold text-neutral-900 text-sm tabular-nums">
                          {selectedOrder.measurements.thigh || '-'}
                        </span>
                      </div>
                      {selectedOrder.measurements.agbadaSpan && (
                        <div className="bg-white p-2 rounded border border-neutral-200 sm:col-span-2">
                          <span className="text-neutral-500 block text-[10px] uppercase">Agbada Wingspan:</span>
                          <span className="font-bold text-neutral-900 text-sm tabular-nums">
                            {selectedOrder.measurements.agbadaSpan}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-neutral-50 rounded text-xs text-neutral-500">
                      Standard sizing or measurement consultation requested.
                    </div>
                  )}
                </div>

                {/* Client Contact Info */}
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 text-xs space-y-2">
                  <span className="font-bold text-neutral-800 uppercase tracking-wider block">
                    Customer & Destination
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-700">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{selectedOrder.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{selectedOrder.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{selectedOrder.deliveryAddress}, {selectedOrder.deliveryCity}, {selectedOrder.deliveryState}</span>
                    </div>
                  </div>
                </div>

                {/* Master Tailor Action & Quotation Form */}
                <form
                  onSubmit={handleSaveQuotation}
                  className="p-5 bg-amber-50/60 rounded-lg border border-amber-300/80 space-y-4 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                      Atelier Quotation & Status Action
                    </h3>
                    {actionSuccess && (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {actionSuccess}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                        Confirmed Quoted Price (NGN ₦) *
                      </label>
                      <input
                        type="number"
                        step="1000"
                        value={quoteInput}
                        onChange={(e) => setQuoteInput(e.target.value)}
                        placeholder="e.g. 115000"
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 font-bold focus:outline-none focus:border-neutral-900 tabular-nums"
                      />
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Estimated yardage, hand embroidery, & luxury packaging
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                        Workflow Status *
                      </label>
                      <select
                        value={statusInput}
                        onChange={(e) => setStatusInput(e.target.value as QuoteStatus)}
                        className="w-full bg-white border border-neutral-300 rounded px-3 py-2 text-xs text-neutral-900 font-semibold focus:outline-none focus:border-neutral-900"
                      >
                        <option value="under_review">Under Review (Assessing Fabric)</option>
                        <option value="quotation_sent">Quotation Sent to Client</option>
                        <option value="approved">Quote Approved / Payment Made</option>
                        <option value="in_production">In Production / Pattern Cut</option>
                        <option value="ready_for_fitting">Ready For Fitting</option>
                        <option value="completed">Completed & Delivered</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-neutral-800 mb-1">
                        Internal Tailor Notes & Cutting Directives:
                      </label>
                      <textarea
                        rows={2}
                        value={tailorNotesInput}
                        onChange={(e) => setTailorNotesInput(e.target.value)}
                        placeholder="e.g. Fabric swatch from Italian mill warehouse #4. Advise cutter Babatunde on extra 1-inch seam allowance for wedding fitting..."
                        className="w-full bg-white border border-neutral-300 rounded p-2.5 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="submit"
                      className="py-2.5 px-6 bg-neutral-950 hover:bg-black text-white font-bold text-xs uppercase tracking-wider rounded shadow-md transition-colors"
                    >
                      Update Order & Save Quotation
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="py-24 text-center text-xs text-neutral-400">
                Select an order from the queue to inspect details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
