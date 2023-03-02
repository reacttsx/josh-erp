<?php

namespace App\Http\Controllers;

use App\Models\Purchase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PurchaseController extends BaseController
{
    /**
     * Create purchase for customer.
     */
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required',
            'amount' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $customer = Purchase::create([
                'customer_id' => $request->customer_id,
                'amount' => $request->amount,
            ]);

            if ($customer->exists)
                return $this->sendResponse($customer, 'Customer purchase added successfully.');
            else
                return $this->sendError('Customer purchase creation failed.');
        }
    }

    /**
     * List all customer purchase.
     */
    public function list()
    {
        $purchase = Purchase::join('customer_enquiry', 'customer_enquiry.id', '=', 'purchase.customer_id')->orderBy("purchase.id", "desc")->paginate(20);

        return response()->json($purchase, 200);
    }
}
