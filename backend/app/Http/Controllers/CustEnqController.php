<?php

namespace App\Http\Controllers;

use App\Models\CustomerEnquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustEnqController extends BaseController
{
    /**
     * Create customer enquiry followup screen.
     */
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact' => 'required|max:255',
            'edod' => 'required|date',
            'mode' => 'required|string|max:80',
            'dealer' => 'required|string|max:80',
            'sales' => 'required|string|max:80',
            'remarks' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $customer = CustomerEnquiry::create([
                'name' => $request->name,
                'contact' => $request->contact,
                'edod' => $request->edod,
                'mode_of_enq' => $request->mode,
                'dealer' => $request->dealer,
                'sales_man' => $request->sales,
                'first_call' => $request->first,
                'first_call_status' => $request->first_status,
                'second_call' => $request->second,
                'second_call_status' => $request->second_status,
                'remarks' => $request->remarks,
                'finished' => $request->finished,
                'completed' => $request->completed,
            ]);

            if ($customer->exists)
                return $this->sendResponse($customer, 'Customer enquiry created successfully.');
            else
                return $this->sendError('Customer enquiry creation failed.');
        }
    }

    /**
     * Update customer enquiry followup screen.
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'contact' => 'required|max:255',
            'edod' => 'required|date',
            'mode' => 'required|string|max:80',
            'dealer' => 'required|string|max:80',
            'sales' => 'required|string|max:80',
            'remarks' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $customer = CustomerEnquiry::where('id', '=', $request->id)->update([
                'name' => $request->name,
                'contact' => $request->contact,
                'edod' => $request->edod,
                'mode_of_enq' => $request->mode,
                'dealer' => $request->dealer,
                'sales_man' => $request->sales,
                'first_call' => $request->first,
                'first_call_status' => $request->first_status,
                'second_call' => $request->second,
                'second_call_status' => $request->second_status,
                'remarks' => $request->remarks,
                'finished' => $request->finished,
                'completed' => $request->completed,
            ]);

            if ($customer)
                return $this->sendResponse($customer, 'Customer enquiry updated successfully.');
            else
                return $this->sendError('Customer enquiry updation failed.');
        }
    }

    /**
     * List all customer enquiry followup.
     */
    public function list()
    {
        $customer = CustomerEnquiry::orderBy("id", "desc")->paginate(20);

        return response()->json($customer, 200);
    }

    /**
     * List all customers.
     */
    public function listCustomer()
    {
        $customer = CustomerEnquiry::select('id as value', 'name as label')->orderBy("name", "asc")->get();

        return response()->json($customer, 200);
    }
}
