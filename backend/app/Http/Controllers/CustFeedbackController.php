<?php

namespace App\Http\Controllers;

use App\Models\CustomerFeedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustFeedbackController extends BaseController
{
    /**
     * Create customer feedback screen.
     */
    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'job_no' => 'required|max:80',
            'dod' => 'required|date',
            'first' => 'required|string|max:255',
            'first_status' => 'required|string|max:255',
            'second' => 'required|string|max:255',
            'second_status' => 'required|string|max:255',
            'third' => 'required|string|max:255',
            'third_status' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        if ($validator->passes()) {
            $customer = CustomerFeedback::create([
                'name' => $request->name,
                'job_no' => $request->job_no,
                'dod' => $request->dod,
                'first_call' => $request->first,
                'first_call_status' => $request->first_status,
                'second_call' => $request->second,
                'second_call_status' => $request->second_status,
                'third_call' => $request->third,
                'third_call_status' => $request->third_status,
            ]);

            if ($customer->exists)
                return $this->sendResponse($customer, 'Customer feedback created successfully.');
            else
                return $this->sendError('Customer feedback creation failed.');
        }
    }

    /**
     * List all customer feedback.
     */
    public function list()
    {
        $customer = CustomerFeedback::orderBy("id", "desc")->paginate(20);

        return response()->json($customer, 200);
    }
}
