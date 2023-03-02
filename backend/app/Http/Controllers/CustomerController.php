<?php

namespace App\Http\Controllers;

use App\Models\Advance;
use App\Models\CustomerEnquiry;
use App\Models\Payments;
use App\Models\Purchase;
use Illuminate\Support\Facades\DB;

class CustomerController extends BaseController
{
    /**
     * Get dashboard data.
     */
    public function dashboard()
    {
        $live = CustomerEnquiry::where(["completed" => 1, "finished" => 0])
            ->count();
        $payments = Payments::select(DB::raw('SUM(amount) as total_payments'))
            ->first();
        $advance = Advance::select(DB::raw('SUM(amount) as advance'))
            ->first();

        $data = ["live" => $live, "receivables" => $payments->total_payments - $advance->advance];

        return response()->json($data, 200);
    }

    /**
     * Search customer details.
     */
    public function search($id)
    {
        $customer = CustomerEnquiry::select('customer_enquiry.id', 'customer_enquiry.name', 'customer_enquiry.contact')
            ->where(["id" => $id])
            ->first();
        $total_payments = Payments::select(DB::raw('SUM(amount) as total_payments'))
            ->where(["customer_id" => $id])
            ->first();
        $advance = Advance::select(DB::raw('SUM(amount) as advance'))
            ->where(["customer_id" => $id])
            ->first();
        $purchase = Purchase::select(DB::raw('SUM(amount) as purchase'))
            ->where(["customer_id" => $id])
            ->first();

        $data = ["id" => $customer->id, "name" => $customer->name, "contact" => $customer->contact, "total_payments" => $total_payments->total_payments, "advance" => $advance->advance, "purchase" => $purchase->purchase, "pending" => $total_payments->total_payments - $advance->advance];

        return response()->json($data, 200);
    }
}
